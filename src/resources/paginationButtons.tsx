export type PaginationButton = {
  type: "prev-page" | "next-page" | "current";
  text?: string;
  disabledFunc: (currentPage: number, totalPages: number) => boolean;
  clickHandlerId?: number;
};

export const paginationButtons: PaginationButton[] = [
  {
    type: "prev-page",
    text: "<<",
    disabledFunc: disableLeftButton,
    clickHandlerId: 1,
  },
  {
    type: "prev-page",
    text: "<",
    disabledFunc: disableLeftButton,
    clickHandlerId: 2,
  },
  {
    type: "current",
    disabledFunc: () => true,
  },
  {
    type: "next-page",
    text: ">",
    disabledFunc: disableRightButton,
    clickHandlerId: 3,
  },
  {
    type: "next-page",
    text: ">>",
    disabledFunc: disableRightButton,
    clickHandlerId: 4,
  },
];

function disableLeftButton(currentPage: number, _totalPages: number) {
  return currentPage === 1;
}

function disableRightButton(currentPage: number, totalPages: number) {
  return currentPage >= totalPages;
}
