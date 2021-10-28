require( 'colors' );
const { inquirerMenu, 
        pause, readInput, 
        deleteTaskFromList, 
        confirmation, 
        multipleSelection } = require( './helpers/inquirer' );
const Tasks = require('./models/tasks');
const { saveData, readData } = require('./helpers/saveFile');

//In the main gonna execute all the code
const main = async () => {

    let option = '';
    const readTasks = readData();
    const tasks = new Tasks();

    if( readTasks ){
        tasks.loadTasksFromArray( readTasks );
    }

    do {
        //Show the menu
        option = await inquirerMenu();
        switch ( option ) {
            case '1':
                const desc = await readInput( 'Description:' );
                tasks.createTask( desc );
                break;
            case '2':
                tasks.listData();
                break;
            case '3':
                tasks.listCompletedPendingTasks();
                break;
            case '4':
                tasks.listCompletedPendingTasks( false );
                break;
            case '5':
                const uids = await multipleSelection( tasks.listArr );
                tasks.toggleComplet( uids );
                break;
            case '6':
                const uid = await deleteTaskFromList( tasks.listArr );
                if( uid !== '0'){
                    const result = await confirmation( 'Are you sure you want to delete this task?' );
                    if( result ){
                        tasks.deleteTask( uid );
                        console.log( "Task deleted" );
                    }
                }
                break;
            case '0':
                
                break;
        }
        saveData( tasks.listArr );

        await pause();
        
    } while (option !== '0');
}
main();