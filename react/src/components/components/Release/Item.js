import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import URL from '../../../url'
import './Item.css'

import io from 'socket.io-client';
const socket = io(URL, { transports: ['websocket'] });

function Item() {
  const { _id } = useParams();
  const navigate = useNavigate()

  const [movies, setMovies] = useState()
  const [load, setLoad] = useState(false)
  const [seatArr, setSeatArr] = useState([])
  const [name, setName] = useState()
  const [email, setEmail] = useState()

  //lấy danh sách chỗ ngồi lần đầu
  useEffect(() => {
    const fetchData = async (e) => {

      const response = await fetch(`${URL}cinema/${_id}`)
      const responseData = await response.json()
      if (responseData.showTime) {
        setMovies(responseData.showTime)
        console.log(responseData.showTime);

      }
    }
    fetchData()
  }, [])
  //update danh sách chỗ ngồi 
  useEffect(() => {
    const fetchData = async (e) => {
      if (load) {
        const response = await fetch(`${URL}cinema/${_id}`)
        const responseData = await response.json()
        if (responseData.showTime) {
          // lấy lại các chỗ client đặt khi có update
          const selectedSeats = []
          const data = responseData.showTime.seats
          for (let i = 0; i < data.length; i++) {
            if (data[i].state === 'selected') {
              selectedSeats.push(data[i].position)
            }
          }
          setMovies(responseData.showTime)
          setSeatArr(prev => {
            const arr = [...prev]
            for (let i = 0; i < arr.length; i++) {
              if (selectedSeats.includes(arr[i])) {
                arr.splice(i, 1)
              }
            }
            return arr
          })
        }
        setLoad(false)
      }
    }
    fetchData()
  }, [load])

  // console.log(seatArr);
  //choose seat handler
  function seatHandle(seat, e) {
    if (seat.state !== 'available') {
      alert('This position has been selected. Please choose another position!')
    } else {
      // xử lý chọn chỗ ngồi
      e.target.classList.toggle('youchoose')
      if (e.target.classList.value.includes('youchoose')) {
        setSeatArr(prev => [...prev, seat.position])
      } else {
        setSeatArr(prev => {
          const i = prev.findIndex(a => a === seat.position)
          if (i !== -1) {
            prev.splice(i, 1)
          }
          return prev
        })
      }
    }
  }

  // patch seat
  const patchSeat = async () => {
    if (name && email && seatArr.length > 0) {
      const response = await fetch(`${URL}cinema/ticket`, {
        method: 'PATCH',
        body: JSON.stringify({
          _id, seatArr, name, email
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const responseData = await response.json();
      //lỗi sai nếu có
      if (responseData.message) {
        alert(responseData.message)
      } else {
        socket.emit('hasticket', _id);
        alert('Buy success')
        navigate('/book')
      }
    } else {
      alert('Please select atleast one seat and enter all field')
    }
  }


  //real time
  useEffect(() => {
    socket.on(_id, (data) => {
      if (data) {
        //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
        setLoad(true);
      }
    });
    // Remove event listener on component unmount
    return () => { socket.off(_id); socket.off('hasticket') }
  }, [])



  if (movies)
    return (
      <div className='wrapper-cinema' >
        <div className='header-cinema'>
          <h2>{movies.title}</h2>
          <p>Ngày giờ chiếu: <strong>{`${movies.movieTime} ${movies.movieDate}`}</strong></p>
          <p className='selected'>Đã được chọn:</p>
          <p className='available'>Chưa được chọn:</p>
          <p className='you'>Bạn đang chọn:</p>
        </div>

        <h3 className='chooseSeat' >Chọn chỗ ngồi</h3>
        <div className='seats'>
          {movies.seats.map((seat) => (
            <p key={seat._id}
              className={`${seat.state == 'available' ? 'availableSeat' : 'selectedSeat'}`}
              onClick={(e) => seatHandle(seat, e)}
            >
              {seat.position}
            </p>
          ))}
        </div>

        <div className='Input'>
          <h3>Tên của bạn</h3>
          <input type='text' placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
          />
        </div>
        <div className='Input'>
          <h3>Email của bạn </h3>
          <input type='text' placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </div>
        <div className='btn'>
          <button className='buyTicket' onClick={patchSeat}>Submit</button>
        </div>
      </div>
    );
}

export default Item