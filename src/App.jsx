import * as React from 'react'
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles'
import {debounce} from 'throttle-debounce'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
// import StackedColumnSideBySide from './Stacked/SideBySide'
import MultiPane from './TrellisMultiPane'
import Line from './Line'
import './styles.scss'

function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props

  return (<div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (<Box p={3}>
      <Typography>{children}</Typography>
    </Box>)}
  </div>)
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}))

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const classes = useStyles()
  const theme = createMuiTheme()
  const [value, setValue] = React.useState(0)
  const [windowHeight, setWindowHeight] = React.useState(0)
  const [windowWidth, setWindowWidth] = React.useState(0)

  const setDimensions = () => {
    setWindowHeight(window.innerHeight)
    setWindowWidth(window.innerWidth)
  }

  const throttle = debounce(1000, false, () => setDimensions())

  React.useEffect(() => {
    window.addEventListener('resize', () => throttle())
    setDimensions()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (<ThemeProvider theme={theme}>
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Line Chart" />
          <Tab label="MultiPane Charts" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Line windowHeight={windowHeight} windowWidth={windowWidth} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MultiPane windowHeight={windowHeight} windowWidth={windowWidth} />
      </TabPanel>
    </div>
  </ThemeProvider>)
}
