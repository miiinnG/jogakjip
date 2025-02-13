import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import logoImg from './assets/logo.svg';
import searchIcon from './assets/search.svg';
import styles from './Nav.module.css';

function Nav() {

    const [isPublic, setIsPublic] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sortOption, setSortOption] = useState('공감순');

    const handleKeywordChange = (e) => setKeyword(e.target.value);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const handleSortChange = (option) => {
      setSortOption(option);
      setIsDropdownOpen(false);
    };

    return (
        <div className={styles.nav}>
            <Container className={styles.container}>
                <div className={styles.topSection}>
                    <Link to="/" className={styles.logo}>
                        조각집
                    </Link>
                    <Link to="/create-group" className={styles.createGroupButton}>
                        그룹 만들기
                    </Link>
                </div>

                <div className={styles.filterSection}>
                    <div className={styles.toggleButtons}>
                        <button 
                            className={`${styles.toggleButton} ${isPublic ? styles.active : ''}`}
                            onClick={() => setIsPublic(true)}
                        >
                            공개
                        </button>
                        <button
                            className={`${styles.toggleButton} ${!isPublic ? styles.active : ''}`}
                            onClick={() => setIsPublic(false)}
                        >
                            비공개
                        </button>
                    </div>

                    <div className={styles.searchBar}>
                        <form className={styles.form}>
                            <img src={searchIcon} alt="검색" className={styles.searchIcon} />
                            <input
                                name="keyword"
                                value={keyword}
                                onCharge={handleKeywordChange}
                                placeholder="그룹명을 검색해 주세요"
                            />
                        </form>
                    </div>

                    <div className={styles.dropdown}>
                        <button className={styles.dropdownButton} onClick={toggleDropdown}>
                        {sortOption} ▼
                        </button>
                        {isDropdownOpen && (
                        <ul className={styles.dropdownMenu}>
                            <li onClick={() => handleSortChange('최신순')}>최신순</li>
                            <li onClick={() => handleSortChange('댓글순')}>댓글순</li>
                            <li onClick={() => handleSortChange('공감순')}>공감순</li>
                        </ul>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Nav;