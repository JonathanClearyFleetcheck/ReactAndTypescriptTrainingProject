import { useCallback } from "react";
import { paginationButtons } from "../resources/paginationButtons.tsx";

export function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number | ((prevPage: number) => number)) => void;
}) {
  const handleFirstPageClick = useHandleFirstPageClickCallback(setCurrentPage);

  const handlePreviousPageClick =
    useHandlePreviousPageClickCallback(setCurrentPage);

  const handleNextPageClick = useHandleNextPageClickCallback(
    setCurrentPage,
    totalPages,
  );

  const handleLastPageClick = useHandleLastPageClickCallback(
    setCurrentPage,
    totalPages,
  );

  const clickHandlerProvider = useClickHandlerProviderCallback(
    handleFirstPageClick,
    handlePreviousPageClick,
    handleNextPageClick,
    handleLastPageClick,
  );

  return (
    <div className="pagination">
      {paginationButtons.map((button) => {
        if (button.type === "current") {
          return <span>{currentPage}</span>;
        }

        if (!button.clickHandlerId) {
          return <></>;
        }

        if (!button.text) {
          return <></>;
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

function useClickHandlerProviderCallback(
  handleFirstPageClick: () => void,
  handlePreviousPageClick: () => void,
  handleNextPageClick: () => void,
  handleLastPageClick: () => void,
) {
  return useCallback(
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
}

function useHandleLastPageClickCallback(
  setCurrentPage: (page: number | ((prevPage: number) => number)) => void,
  totalPages: number,
) {
  return useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);
}

function useHandleNextPageClickCallback(
  setCurrentPage: (page: number | ((prevPage: number) => number)) => void,
  totalPages: number,
) {
  return useCallback(() => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }, [totalPages]);
}

function useHandlePreviousPageClickCallback(
  setCurrentPage: (page: number | ((prevPage: number) => number)) => void,
) {
  return useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);
}

function useHandleFirstPageClickCallback(
  setCurrentPage: (page: number | ((prevPage: number) => number)) => void,
) {
  return useCallback(() => {
    setCurrentPage(1);
  }, []);
}
