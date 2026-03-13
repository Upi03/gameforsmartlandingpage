export default function UserAccountPopup({ isOpen }: { isOpen: boolean }) {
    return (
        <div className={`user-account-popup p-4 ${isOpen ? 'open' : ''}`}>
            <div className="account-items d-grid gap-1" data-tilt>
                <div className="user-level-area p-3">
                    <div className="user-info d-between">
                        <span className="user-name fs-five">David Malan</span>
                        <div className="badge d-flex align-items-center">
                            <i className="ti ti-medal fs-three fs-normal tcp-2"></i>
                            <i className="ti ti-medal fs-three fs-normal tcp-2"></i>
                            <i className="ti ti-medal fs-three fs-normal tcp-2"></i>
                        </div>
                    </div>
                    <div className="user-level">
                        <span className="level-title tcn-6">Level</span>
                        <div className="level-bar my-1">
                            <div className="level-progress" style={{ width: '30%' }}></div>
                        </div>
                    </div>
                </div>
                <a href="/profile" className="account-item">View Profile</a>
                <button className="bttn account-item">Logout</button>
            </div>
        </div>
    );
}
