import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalEx = ({
    onModal,
    isOpen,
    modalMsg,
    onSubmit,
    modalTitle
}) => (
    <div>
    <Modal isOpen={isOpen} toggle={onModal} className=''>
      <ModalHeader toggle={onModal}>{modalTitle}</ModalHeader>
      <ModalBody>
        {modalMsg}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onSubmit}>是</Button>{' '}
        <Button color="secondary" onClick={onModal}>取消</Button>
      </ModalFooter>
    </Modal>
  </div>
)


export default ModalEx;