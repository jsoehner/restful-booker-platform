import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Cookies from 'universal-cookie';

interface NavProps {
  setAuthenticate: (value: boolean) => void;
  isAuthenticated: boolean | null;
  setCount: () => void;
  count: number;
}

const Nav: React.FC<NavProps> = ({ setAuthenticate, isAuthenticated, setCount, count }) => {
  const pathname = usePathname();
  
  React.useEffect(() => {
    if (isAuthenticated) {
      setCount();
    }
  }, [isAuthenticated, setCount]);

  const doLogout = () => {
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
    setAuthenticate(false);
  };

  const getNavLinkClass = (path: string) => {
    return pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          Restful Booker Platform Demo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link href="/admin/rooms" className={getNavLinkClass('/admin/rooms')}>
                    Rooms
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/report" className={getNavLinkClass('/admin/report')}>
                    Report
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/branding" className={getNavLinkClass('/admin/branding')}>
                    Branding
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/message" className={getNavLinkClass('/admin/message')}>
                    Messages {count > 0 && <span className="badge badge-pill badge-primary">{count}</span>}
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <li className="nav-item">
                <button onClick={doLogout} className="btn btn-outline-danger my-2 my-sm-0">
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link href="/admin" className={getNavLinkClass('/admin')}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav; 