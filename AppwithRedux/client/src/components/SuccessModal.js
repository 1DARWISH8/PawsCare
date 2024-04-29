import React from 'react'

function SuccessModal({ show, onClose, message }) {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog modal-confirm">
            <div className="modal-content">
            <div className="modal-header">
                <div className="success-icon-box">
                <i className="fa fa-check"></i>
                </div>
                <h4 className="modal-title w-100">Awesome!</h4>
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

export default SuccessModal
