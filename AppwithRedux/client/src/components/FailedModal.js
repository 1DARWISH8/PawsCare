import React from 'react'

function FailedModal({ show, onClose, message }) {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog modal-confirm">
            <div className="modal-content">
            <div className="modal-header">
                <div className="icon-box">
                <i className="fas fa-times"></i>
                </div>
                <h4 className="modal-title w-100">Sorry!</h4>
            </div>
            <div className="modal-body">
                <p className="text-center">{message}</p>
            </div>
            <div className="modal-footer">
                <button className="btn btn-danger btn-block" onClick={onClose}>OK</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default FailedModal
