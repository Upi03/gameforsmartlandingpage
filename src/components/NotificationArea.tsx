export default function NotificationArea({ isOpen }: { isOpen: boolean }) {
    return (
        <div className={`notification-area p-4 ${isOpen ? 'open' : ''}`} data-lenis-prevent>
            <div className="notification-card d-grid gap-lg-4 gap-2" data-tilt>
                {[1, 2, 1, 2].map((id, idx) => (
                    <a href="#" key={idx}>
                        <div className="card-item d-flex align-items-center gap-4">
                            <div className="card-img-area">
                                <img className="w-100 rounded-circle" src={`/assets/img/avatar${id}.png`} alt="profile" />
                            </div>
                            <div className="card-info">
                                <span className="card-title d-block tcn-1"> {id === 1 ? 'Cristofer Dorwart' : 'Piter Maio'}</span>
                                <span className="card-text d-block tcn-1 fs-sm">{id === 1 ? 'Winners The Last Game' : 'Accept your challenge'}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
