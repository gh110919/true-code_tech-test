"use client";

import { useQuery } from "@tanstack/react-query";
import { MouseEvent, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { styled } from "styled-components";
import { TPhotos, TProducts } from "../../backend/assets/migrate";
import { api } from "../api/api";
import { useDispatch_, useSelector_ } from "../global-state";
import { dataSlice } from "../global-state/slices/data";
import { modalSlice } from "../global-state/slices/modal";
import { paginationSlice } from "../global-state/slices/pagination";
import { sidebarSlice } from "../global-state/slices/sidebar";
import { Carousel_ } from "./carousel";
import { Dropdown_ } from "./dropdown";
import { Modal_ } from "./modal";
import { Pagination_ } from "./pagination";
import { Sidebar } from "./sidebar";

export const Catalog = () => {
  const dispatch = useDispatch_();
  const { pagination, page } = useSelector_((s) => s.paginationSlice);
  const { sorting } = useSelector_((s) => s.sortingSlice);
  const { products, photos } = useSelector_((s) => s.dataSlice);
  const { left } = useSelector_((s) => s.sidebarSlice);
  const { visible } = useSelector_((s) => s.modalSlice);

  type TFetch<T> = Promise<{
    success: boolean;
    message: {
      payload: T[];
      total: number;
    };
  }>;

  const fetchProducts = async (): TFetch<TProducts> => {
    const { data } = await api.get(`/crud/products`, {
      params: { ...pagination, ...sorting },
    });
    return data;
  };

  const productsQuery = useQuery({
    queryKey: ["products", pagination, sorting],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (productsQuery.data?.success) {
      dispatch(
        dataSlice.actions.productsRM({
          products: productsQuery.data.message.payload,
        })
      );
    }
  }, [productsQuery, dispatch]);

  const fetchPhotos = async (): TFetch<TPhotos> => {
    const { data } = await api.get(`/crud/photos`);
    return data;
  };

  const photosQuery = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  });

  useEffect(() => {
    if (photosQuery.data?.success) {
      dispatch(
        dataSlice.actions.photosRM({ photos: photosQuery.data.message.payload })
      );
    }
  }, [photosQuery, dispatch]);

  useEffect(() => {
    if (productsQuery.data?.message?.total) {
      dispatch(
        paginationSlice.actions.pagesRM({
          pages: Math.ceil(
            productsQuery.data?.message.total / pagination?.limit!
          ),
        })
      );
    }
  }, [productsQuery.data, pagination]);

  useEffect(() => {
    dispatch(
      paginationSlice.actions.paginationRM({
        pagination: { ...pagination!, offset: pagination?.limit! * page! - 3 },
      })
    );
  }, [page, pagination?.limit]);

  const [state, setState] = useState<TProducts>();

  const handleSidebarClick = (
    event: MouseEvent<HTMLButtonElement>,
    e: TProducts
  ) => {
    event.stopPropagation();
    dispatch(sidebarSlice.actions.leftRM({ left: !left }));
    setState(e);
  };

  const handleBodyClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(modalSlice.actions.visibleRM({ visible: !visible }));
  };

  return (
    <Container>
      <CardList>
        {products?.map((e, i) => (
          <li key={i}>
            <Card style={{ width: "18rem" }}>
              <Carousel_ images={photos} />
              <Card.Body onClick={(event) => handleBodyClick(event)}>
                <Card.Title>{e.title}</Card.Title>
                <Card.Text>{e.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={(event) => handleSidebarClick(event, e)}
                >
                  Редактировать
                </Button>
              </Card.Body>
            </Card>
          </li>
        ))}
      </CardList>
      <Controls>
        <Pagination_ />
        <Dropdown_></Dropdown_>
      </Controls>
      <Sidebar data={state}></Sidebar>
      {/* <UploadPhotos></UploadPhotos> */}
      <Modal_ data={state}></Modal_>
    </Container>
  );
};

const Controls = styled.div`
  ${(p) => (p.className = "Controls")};
  display: flex;
  gap: 32px;
`;

const CardList = styled.ul`
  ${(p) => (p.className = "CardList")};
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  height: fit-content;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 32px;
`;
