import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
// import { DropzoneArea } from "material-ui-dropzone";
const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      width: 700,
      minWidth: 300,
      maxWidth: 700,
    },
  })
);

const Dropzone = () => {
  const classes = useStyles();

  return (
    <DropzoneArea
      showPreviews={true}
      showPreviewsInDropzone={false}
      useChipsForPreview
      previewGridProps={{ container: { spacing: 1, direction: "row" } }}
      previewChipProps={{ classes: { root: classes.previewChip } }}
      previewText="Selected files"
    />
  );
};

export default Dropzone;
