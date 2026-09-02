import { useCallback } from "react";

const paginationButtons = [
  {
    text: "<<",
    disabledFunc: (currentPage: number, totalPages: number) =>
      currentPage === 1,
    clickHandlerId: 1,
  },
  {
    text: "<",
    disabledFunc: (currentPage: number, totalPages: number) =>
      currentPage === 1,
    clickHandlerId: 2,
  },
  {
    content: (currentPage: number) => <span>{currentPage}</span>,
  },
  {
    text: ">",
    disabledFunc: (currentPage: number, totalPages: number) =>
      currentPage >= totalPages,
    clickHandlerId: 3,
  },
  {
    text: ">>",
    disabledFunc: (currentPage: number, totalPages: number) =>
      currentPage >= totalPages,
    clickHandlerId: 4,
  },
];

export function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number | ((prevPage: number) => number)) => void;
}) {
  const handleFirstPageClick = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handlePreviousPageClick = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);

  const handleNextPageClick = useCallback(() => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }, [totalPages]);

  const handleLastPageClick = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  const clickHandlerProvider = useCallback(
    (clickHandlerId: number) => {
      switch (clickHandlerId) {
        case 1:
          return handleFirstPageClick;
        case 2:
          return handlePreviousPageClick;
        case 3:
          return handleNextPageClick;
        case 4:
          return handleLastPageClick;
        default:
          return () => {};
      }
    },
    [
      handleFirstPageClick,
      handlePreviousPageClick,
      handleNextPageClick,
      handleLastPageClick,
    ],
  );

  return (
    <div className="pagination">
      {paginationButtons.map((button) => {
        if (button.content) {
          return button.content(currentPage);
        }

        return (
          <button
            key={button.clickHandlerId}
            className="pagination-button"
            disabled={button.disabledFunc(currentPage, totalPages)}
            onClick={clickHandlerProvider(button.clickHandlerId)}
          >
            {button.text}
          </button>
        );
      })}
    </div>
  );
}
