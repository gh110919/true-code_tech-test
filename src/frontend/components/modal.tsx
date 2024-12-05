import { Button, Modal } from "react-bootstrap";
import { styled } from "styled-components";
import { useDispatch_, useSelector_ } from "../global-state";
import { modalSlice } from "../global-state/slices/modal";
import { TProducts } from "../../backend/assets/migrate";

type TProps = Partial<{
  data: TProducts;
}>;

export const Modal_ = (_props?: TProps) => {
  const dispatch = useDispatch_();
  const { visible } = useSelector_((s) => s.modalSlice);

  const handleClick = () => {
    dispatch(modalSlice.actions.visibleRM({ visible: !visible }));
  };

  return (
    <Container>
      <Modal show={visible} onHide={handleClick}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
`;
