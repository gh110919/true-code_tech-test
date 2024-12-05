import { Pagination } from "react-bootstrap";
import { styled } from "styled-components";
import { useDispatch_, useSelector_ } from "../global-state";
import { paginationSlice } from "../global-state/slices/pagination";

type TProps = Partial<{
  // onClick: (number: number) => void;
}>;

export const Pagination_ = (_props?: TProps) => {
  const dispatch = useDispatch_();
  const { pages, page } = useSelector_((s) => s.paginationSlice);

  const handleClick = (number: number) => {
    dispatch(paginationSlice.actions.pageRM({ page: number }));
  };

  let items = [];

  for (let number = 1; number <= pages!; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => handleClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container>
      <Pagination size="lg">{items}</Pagination>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
`;
