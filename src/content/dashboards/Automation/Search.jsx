import { TextField, InputAdornment, IconButton, styled } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import MicTwoToneIcon from "@mui/icons-material/MicTwoTone";

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
  
    .MuiSvgIcon-root {
      opacity: .7;
    }
  
    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
    
    .MuiInputBase-root {
        background: ${theme.colors.alpha.white[100]};
    }
  
    .MuiInputBase-adornedEnd {
      padding-right: ${theme.spacing(0.5)};
    }
  `
);

function Search() {
  return (
    <SearchInputWrapper
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchTwoToneIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <MicTwoToneIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      placeholder="Search..."
      fullWidth
    />
  );
}

export default Search;
