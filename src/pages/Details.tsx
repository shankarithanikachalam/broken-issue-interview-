import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useIncidentsStore } from '../state/incidentsStore';
const Details = () => {
    const navigate = useNavigate();
    const incidents = useIncidentsStore((s) => s.incidents);
    const id = useIncidentsStore((s) => s.selectedId);
    const incident = incidents?.find((i) => i.id === id);

    const closeModal = () => {
        navigate(-1); // go back
    };
    if (!incident) {
        return (
            <div>
                <p>No incident selected</p>
                <button onClick={() => navigate("/")}>Go Back</button>
            </div>
        );
    }
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        }
        window.addEventListener('keydown', handleKeyDown);// Listen for Escape key to close the modal
        return () => {
            window.removeEventListener('keydown', handleKeyDown);// Clean up the event listener on unmount
        }
    }, [closeModal]);
    // Add role defines what type of element it is and aria-label defines the label for accessibility
    return (
        <div className='detail-popup' onClick={closeModal} role="dialog" aria-modal="true"  aria-label="Incident Details"> 
            <div className="details-panel" onClick={(e) => e.stopPropagation()}>
                <div className='detailed_view_header' aria-labelledby="modal-title" >
                    <div><b>Detailed View</b></div>
                    <button onClick={closeModal} aria-label="Close incident details" >
                        <strong>X</strong>
                    </button>
                </div>
                <hr />
                <div
                    className="detailed_view_content"
                >
                    <div>
                        Title: <strong> {incident.title}</strong>
                    </div>
                    <div>
                        Description: <strong> {incident.description}</strong>
                    </div>
                    <div>
                        Severity: <strong> {incident.severity.toUpperCase()}</strong>
                    </div>
                    <div>
                        Timestamp: <strong>{new Date(incident.timestamp).toLocaleString()}</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
