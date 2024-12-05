import { DropdownButton, Dropdown } from "react-bootstrap";
import { styled } from "styled-components";
import { useDispatch_, useSelector_ } from "../global-state";
import { sortingSlice } from "../global-state/slices/sorting";

type TProps = Partial<{
  children: JSX.Element;
}>;

export const Dropdown_ = (_props?: TProps) => {
  const dispatch = useDispatch_();

  const { sorting } = useSelector_((s) => s.sortingSlice);

  const handleClick = (variant: "asc" | "desc") => {
    dispatch(
      sortingSlice.actions.orderRM({ sorting: { ...sorting!, order: variant } })
    );
  };

  return (
    <Container>
      <DropdownButton
        id="dropdown-item-button"
        title={
          sorting?.order ? String(sorting.order).toUpperCase() : "Sorting order"
        }
      >
        <Dropdown.Item as="button" onClick={() => handleClick("asc")}>
          asc
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => handleClick("desc")}>
          desc
        </Dropdown.Item>
      </DropdownButton>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
`;
