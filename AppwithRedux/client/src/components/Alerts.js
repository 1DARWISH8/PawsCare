import React from 'react'

function Alerts({ show,type,message,onClose }) {
return (
<div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
    {
        type==="success"&&
        <div className="modal-dialog modal-confirm">
            <div className="modal-content">
                <div className="modal-footer">
                    <button className="btn btn-danger btn-block" onClick={onClose}><i class="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-header">
                    <div className="success-icon-box">
                    <i className="fa fa-check"></i>
                    </div>
                    <h4 className="modal-title w-100">Awesome!</h4>
                </div>
                <div className="modal-body">
                    <p className="text-center">{message}</p>
                </div>
            </div>
        </div>
    }
    {
        type==="exists"&&
        <div className="modal-dialog modal-confirm">
            <div className="modal-content">
                <div className="modal-footer">
                    <button className="btn btn-danger btn-block" onClick={onClose}><i class="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-header">
                    <div className="exists-icon-box">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <h4 className="modal-title w-100">Great!</h4>
                </div>
                <div className="modal-body">
                    <p className="text-center ">{message}</p>
                </div>
            </div>
        </div>
    }
    {
        type==="failure"&&
        <div className="modal-dialog modal-confirm">
            <div className="modal-content">
                <div className="modal-footer">
                    <button className="btn btn-danger btn-block" onClick={onClose}><i class="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-header">
                    <div className="icon-box">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <h4 className="modal-title w-100">OOPS!</h4>
                </div>
                <div className="modal-body">
                    <p className="text-center fw-bold text-danger">{message}</p>
                </div>
            </div>
        </div>
    }
</div>
)
}

export default Alerts
