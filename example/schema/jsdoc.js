import rqt from 'rqt'

/* start example */
import typal from '../src'

/// standard logging
typal('hello world')

/// verbose logging
typal('', { verbose: true })
/* end example */