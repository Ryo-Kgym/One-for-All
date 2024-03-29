/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

import type { GetDepositQuery } from "@v3/graphql/household";

import type { CategoryDetail } from "./type";
import { refillDepositQuery as testTarget } from "./refill-deposit-query";

describe("refillDepositQuery function", () => {
  it("should correctly transform the provided GetDepositQuery data to CategoryDetail array", () => {
    const mockData: GetDepositQuery = {
      depositCategory: [
        {
          category: {
            categoryName: "test_category",
            id: "123",
            daily: {
              nodes: [
                {
                  id: "1",
                  date: new Date(),
                  amount: 100,
                  memo: "test daily detail",
                },
              ],
            },
            credit: {
              nodes: [
                {
                  id: "2",
                  date: new Date(),
                  amount: 200,
                  memo: "test credit detail",
                },
              ],
            },
          },
        },
      ],
    };

    const expectedResult: CategoryDetail[] = [
      {
        categoryId: "123",
        categoryName: "test_category",
        details: [
          {
            detailId: "1",
            type: "daily",
            date: mockData.depositCategory[0]!.category.daily.nodes[0]!
              .date as Date,
            amount: 100,
            memo: "test daily detail",
          },
          {
            detailId: "2",
            type: "credit",
            date: mockData.depositCategory[0]!.category.credit.nodes[0]!
              .date as Date,
            amount: 200,
            memo: "test credit detail",
          },
        ],
      },
    ];

    const result = testTarget(mockData);
    expect(result).toEqual(expectedResult);
  });

  it("should return an empty array when the provided data is undefined", () => {
    const result = testTarget(undefined);
    expect(result).toEqual([]);
  });
});
