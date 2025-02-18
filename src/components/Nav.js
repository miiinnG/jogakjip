import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import logo from '../assets/logo.svg';
import searchIcon from '../assets/search.svg';

const Nav = ({ showTabs = false, showSearch = false, showCreateButton = false, showSortDropDown = false, setSelectedTab }) => {
    const [activeTab, setActiveTab] = useState('공개');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setSelectedTab(tab);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.topContainer}>
                <div className={styles.logoWrapper}>
                    {/* 로고 */}
                    <Link to="/" className={styles.logo}>
                        <img src={logo} alt="조각집 로고" className={styles.logoImage} />
                    </Link>
                </div>
                {/* 그룹 만들기 버튼 */}
                {showCreateButton && (
                    <Link to="/create-group" className={styles.createButton}>
                        그룹 만들기
                    </Link>
                )}
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.navLeft}>
                    {/* 공개/비공개 탭 (필요한 경우만 렌더링) */}
                    {showTabs && (
                        <div className={styles.tabs}>
                            <button
                                className={activeTab === "public" ? styles.activeTab : ""}
                                onClick={() => handleTabClick("public")}
                            >
                                공개
                            </button>
                            <button
                                className={activeTab === "private" ? styles.activeTab : ""}
                                onClick={() => handleTabClick("private")}
                            >
                                비공개
                            </button>
                        </div>
                    )}
                </div>
                <div className={styles.navCenter}>
                    {/* 검색 바 (필요한 경우만 렌더링) */}
                    {showSearch && (
                    <div className={styles.searchContainer}>
                        <img src={searchIcon} alt="검색 아이콘" className={styles.searchIcon} />
                        <input type="text" placeholder="그룹명을 검색해 주세요" className={styles.searchBar} />
                    </div>
                )}
                </div>
                <div className={styles.navRight}>
                    {/* 우측 요소들 (정렬 드롭다운) */}
                    {showSortDropDown && (
                        <select className={styles.sortDropDown}>
                            <option>공감순</option>
                            <option>최신순</option>
                        </select>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;