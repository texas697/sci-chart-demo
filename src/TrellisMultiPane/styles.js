import { createStyles, makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) =>
    createStyles({
      root: {
        width: ({ width }) => width,
        height: ({ height }) => height,
        minWidth: ({ width }) => width,
        maxHeight: ({ height }) => height,
        display: 'flex',
        flexDirection: 'column',
      },
      chartContainer: {
        height: ({ height }) => height,
        width: ({ width }) => width,
        position: 'relative',
        display: 'flex',
        bottom: 0,
      },
    })
);
