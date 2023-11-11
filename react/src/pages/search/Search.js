import React from 'react';
import NavBar from '../../components/components/NavBar/NavBar'
import ResultList from '../../components/components/ResultList/ResultList'
import InputProvider from '../../store/Input-provider'

import styles from './Search.module.css'

const Search = () => {
	return (
		<InputProvider>
			<div className={styles.app}>
				<NavBar />
				<div className={styles.search}>
					<ResultList />
				</div>
			</div>
		</InputProvider>
	);
};

export default Search;
