import { Offcanvas, Form } from "react-bootstrap";
import { styled } from "styled-components";
import { useDispatch_, useSelector_ } from "../global-state";
import { sidebarSlice } from "../global-state/slices/sidebar";
import { TProducts } from "../../backend/assets/migrate"; 

type TProps = Partial<{
  data: TProducts;
}>;

export const Sidebar = (_props?: TProps) => {
  const dispatch = useDispatch_();
  const { left } = useSelector_((s) => s.sidebarSlice);

  const handleClick = () => {
    dispatch(sidebarSlice.actions.leftRM({ left: !left }));
  };

  return (
    <Container>
      <Offcanvas show={left} onHide={handleClick}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Редактировать</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {_props?.data &&
              Object.entries(_props?.data!).map((e, i) => {
                return (
                  <li key={i}>
                    <Form>
                      <Form.Group>
                        <Form.Label>{e[0]}</Form.Label>
                        <Form.Control
                          type={typeof e[1]}
                          placeholder={String(e[1])}
                        />
                      </Form.Group>
                    </Form>
                  </li>
                );
              })}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

const Container = styled.aside`
  display: flex;
`;
