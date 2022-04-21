import { RepositoryListContainer } from "../../components/RepositoryList/index";
import { render, within } from "@testing-library/react-native";
import { shortenNumber } from "../../utils";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );
      const repositoryItems = getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      const first = repositories.edges[0].node;
      const second = repositories.edges[1].node;

      within(firstRepositoryItem).getByText(first.fullName);
      within(firstRepositoryItem).getByText(first.description);
      within(firstRepositoryItem).getByText(first.language);
      within(firstRepositoryItem).getByText(shortenNumber(first.forksCount));
      within(firstRepositoryItem).getByText(
        shortenNumber(first.stargazersCount)
      );
      within(firstRepositoryItem).getByText(shortenNumber(first.ratingAverage));
      within(firstRepositoryItem).getByText(shortenNumber(first.reviewCount));

      within(secondRepositoryItem).getByText(second.fullName);
      within(secondRepositoryItem).getByText(second.description);
      within(secondRepositoryItem).getByText(second.language);
      within(secondRepositoryItem).getByText(shortenNumber(second.forksCount));
      within(secondRepositoryItem).getByText(
        shortenNumber(second.stargazersCount)
      );
      within(secondRepositoryItem).getByText(
        shortenNumber(second.ratingAverage)
      );
      within(secondRepositoryItem).getByText(shortenNumber(second.reviewCount));
    });
  });
});
