import { DropzoneArea } from "material-ui-dropzone";

import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
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
