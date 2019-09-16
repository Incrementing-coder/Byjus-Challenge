import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const modal = (props) => {

    const salary = props.salary
    const jd = props.jd
    const exp = props.exp
    const location = props.location
    const applyLink = props.applylink
    return (
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title} 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Location : {location}</h4>
        <h4>Experience Required : {exp==="" || exp===undefined? 'N.A' : exp}</h4>
        <h4>Job Description: </h4>
        <p>
          {jd==="" || jd===undefined ? 'N.A' : jd}
        </p>
        <h4>Salary : {salary==="" ? 'N.A' : salary}</h4>
      </Modal.Body>
      <Modal.Footer>
        <a href={applyLink} type='button' className='btn btn-success' target='_blank' rel='noopener noreferrer'>Apply</a>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
}

export default modal;