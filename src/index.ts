
/* IMPORT */

import chalk from 'chalk';
import * as simpleGit from 'simple-git/promise';

/* AUTOCOMMIT */

const defaultOptions = {
  message: '',
  paths: []
};

function factory ( options? ) {

  options = Object.assign ( {}, defaultOptions, options );

  return async function autocommit ( config, repoPath, ctx, task ) {

    if ( !options.message ) return task.skip ( 'You need to provide a message' );

    task.title = `autocommit ${chalk.gray ( options.message )}`;

    if ( !options.paths.length ) return task.skip ( 'You need to provide an array of paths' );

    const git = simpleGit ( repoPath ),
          status = await git.status (),
          files = status.files.filter ( file => options.paths.includes ( file.path ) ),
          filesPaths = files.map ( file => file.path );

    if ( !filesPaths.length ) return task.skip ( 'No files to autocommit' );

    task.output = `Committing ${filesPaths.length} files...`;

    if ( config.dry ) return task.skip ();

    await git.add ( filesPaths );
    await git.commit ( options.message );

    task.output = `Committed ${filesPaths.length} ${filesPaths.length === 1 ? 'file' : 'files'}`;

  };

}

/* EXPORT */

export = Object.assign ( factory, { default: factory } );
