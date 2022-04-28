import { useContext } from "react";

import { SnackBarContext } from "../context/snackbar";

const useSnackBar = () => useContext(SnackBarContext);

export default useSnackBar;
