const transporter = require('../conf/nodemailer')
const env = require('../env')
const cron = require('node-cron');

const Showtime = require('../models/showtimes');
const Book = require('../models/booking');

module.exports = {
  release: async (req, res, next) => {
    const showTimes = await Showtime.find({})
    try {
      res.status(200).json({ showTimes: showTimes.reverse() });
    } catch (err) {
      res.status(400).json({ message: 'error' });
    }
  },
  detail: async (req, res, next) => {
    try {
      const showTime = await Showtime.findById(req.params.id)
      res.status(200).json({ showTime });
    } catch (err) {
      res.status(400).json({ message: 'error' });
    }
  },
  changeSeat: async (req, res, next) => {
    try {
      const { _id, seatArr, name, email } = req.body

      //kieemr tra email
      const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!regex.test(email)) {
        return res.status(400).json({ message: 'Please enter your email!' })
      }
      //lấy xuất chiếu
      const showTime = await Showtime.findById(_id)
      if (!showTime || showTime.length == 0) {
        return res.status(404).json({ message: 'Not found showtime' })
      }
      const seats = [...showTime.seats]
      for (let i = 0; i < seatArr.length; i++) {
        const j = seats.findIndex(seat => seat.position === Number(seatArr[i]))
        //check chỗ ngồi tồn tại không ?
        if (j === -1) {
          return res.status(404).json({ message: 'Not found seat' })
        } else {
          if (seats[j].state !== 'available') {
            return res.status(400).json({ message: 'This seat has been other selected' })
          } else {
            seats[j].state = 'selected'
          }
        }
      }
      showTime.seats = seats

      const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        to: email,
        from: env.USER_NODEMAILER,
        subject: 'Your cinema ticket',
        html: `
        <h2>Xin Chào ${name} </h2>
        <p>Dưới đây là thông tin về vé của bạn</p>
        <p>Chỗ ngồi: <strong>${seatArr.join(', ')}</strong></p>
        <p>Ngày giờ chiếu: <strong>${showTime.movieTime} ${showTime.movieDate}</strong></p>
        <h2>Cảm ơn bạn!</h2>
      `
      }
      transporter.sendMail(mainOptions, async function (err) {
        if (err) {
          return res.status(400).json({ message: 'Has error.Please try again or contact with me to be supported.' })
        } else {
          const book = new Book({
            name, email,
            seatPosition: seatArr,
            idShowtimes: _id
          })
          await book.save()
          await showTime.save()
          res.status(200).json({ state: 'oke' });
          //set gio bao thuc
          const year = new Date().getFullYear()
          const { month, day, houre, minute } = date(showTime.movieDate, showTime.movieTime)
          const startTime = new Date(year, month, day, houre, minute, 0, 0)
          const reminderTime = (new Date(startTime.getTime() - 60 * 60000))
          const cronPattern = `${reminderTime.getSeconds()} ${reminderTime.getMinutes()} ${reminderTime.getHours()} ${reminderTime.getDate()} ${reminderTime.getMonth() + 1} *`

          scheduleReminder(cronPattern, name, email, showTime.movieDate, showTime.movieTime, seatArr.join(', '))
        }
      });


    } catch (err) {
      return res.status(400).json({ message: 'Has error.Please try again or contact with me to be supported.' })
    }
  },

}


// Hàm lên lịch nhắc nhở

function scheduleReminder(time, name, email, movieTime, movieDate, seatArr) {
  try {
    cron.schedule(time, () => {
      console.log("reminder...");
      const mainOption = { // thiết lập đối tượng, nội dung gửi mail
        to: email,
        from: env.USER_NODEMAILER,
        subject: 'Reminder time cinema',
        html: `
        <h2>Xin Chào ${name} </h2>
        <p>Bạn có lịch xem phim vào lúc<strong>${movieTime} ${movieDate}</strong></p>
       <p>Chỗ ngồi: <strong>${seatArr}</strong></p>
        <h2>Cảm ơn bạn!</h2>
        `
      }
      transporter.sendMail(mainOption, async function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}



//lấy ngày tháng giờ phút

function date(monthday, time) {
  const i = monthday.indexOf('/')
  const day = Number(monthday.slice(0, i))
  const month = Number(monthday.substr(i + 1) - 1)

  const j = time.indexOf(':')
  const houre = Number(time.slice(0, j))
  const minute = Number(time.substr(j + 1))

  return { month, day, houre, minute }
}

