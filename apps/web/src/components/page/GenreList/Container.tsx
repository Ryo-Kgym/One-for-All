/*
 * Copyright (c) 2024 Ryo-Kgym.
 */
"use client";

import type { TableProps } from "@components/atoms/Table";
import type { GenreType } from "@domain/model/household/GenreType";
import type { IocomeType } from "@domain/model/household/IocomeType";
import { useRouter } from "next/navigation";
import { ValidityStatus } from "@components/atoms";
import { getLabel as getGenreTypeLabel } from "@domain/model/household/GenreType";
import { getLabel as getIocomeTypeLabel } from "@domain/model/household/IocomeType";
import { useGroup } from "@hooks/group/useGroup";
import { useGetAllGenreQuery } from "@v3/graphql/household";

import { Presenter_ } from "./Presenter";

export const Container_ = () => {
  const { push } = useRouter();
  const { groupId } = useGroup();
  const [{ data, fetching }] = useGetAllGenreQuery({
    variables: {
      groupId,
    },
  });

  if (fetching) return <div>Loading....</div>;

  const tablePropsList: TableProps[] =
    data?.genre.map(
      ({
        id: genreId,
        genreName,
        genreType,
        iocomeType,
        displayOrder,
        validFlag,
      }) => ({
        keyPrefix: "genre",
        columns: [
          { value: genreName },
          {
            value: getGenreTypeLabel(genreType as GenreType),
            align: "center",
          },
          {
            value: getIocomeTypeLabel(iocomeType as IocomeType),
            align: "center",
          },
          {
            value: <ValidityStatus value={validFlag ?? true} />,
            align: "center",
          },
          { value: displayOrder, align: "right" },
        ],
        onClick: () => {
          push(`/household/setting/genre/edit/${genreId}`);
        },
      }),
    ) ?? [];

  return <Presenter_ tablePropsList={tablePropsList} />;
};
