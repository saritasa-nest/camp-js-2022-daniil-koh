import { VFC } from 'react';
import { useTheme } from '@mui/material/styles';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

interface TablePaginationActionsProps {
  /** Handler to go to next page. */
  onNextPage: () => void;
  /** Handler to back to previous page. */
  onPreviousPage: () => void;

}

export const FilmsTablePagination: VFC<TablePaginationActionsProps> = props => {
  const theme = useTheme();
  const {
    onNextPage, onPreviousPage,
  } = props;

  /**
   * Handler to back to previous page.
   */
  const handleBackButtonClick = (): void => {
    onPreviousPage();
  };

  /**
   * Handler to go to next page.
   */
  const handleNextButtonClick = (): void => {
    onNextPage();
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={() => handleBackButtonClick()}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={() => handleNextButtonClick()}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  );
};
