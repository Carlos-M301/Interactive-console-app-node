const Task = require('./task');

class Tasks {
    _list = {};
    get listArr(){
        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            
            list.push( task );
        })
        return list;
    }
    constructor(){
        this._list = {};
    }

    deleteTask( uid ){
        if( this._list[uid] ){
            delete this._list[uid];
        }
    }

    loadTasksFromArray( tasks = [] ){
        tasks.forEach( task => {
            this._list[task.id] = task;
        });
    }

    createTask( desc = '' ){
        const task = new Task(desc);
           this._list[task.id] = task;
    }

    listData(){
        console.log();
        this.listArr.forEach( ( task, index ) => {
            const iteration = `${index + 1}`.green;
            const { desc, taskEndDate } = task;
            const existEndDate =  taskEndDate ? "Completed".green: "Pending".red;
            console.log(`${ iteration }. ${ desc } :: ${ existEndDate }`);
        });
    }

    listCompletedPendingTasks( completed = true ){
        let index = 1;
        console.log();
        this.listArr.forEach( ( task ) => {
            
            const { desc, taskEndDate } = task;
            if( completed ){
                if( taskEndDate ){
                    const iteration = `${ index }.`.green;
                    console.log(`${ iteration } ${ desc } :: ${ taskEndDate.green }`);
                    index++;
                }
                
            }
            else{
                if( !taskEndDate ){
                    const iteration = `${ index }.`.green;
                    console.log(`${ iteration } ${ desc } :: ${ "Pending".red }`);
                    index++;
                }
                
            }
            
            
        });
    }

    toggleComplet( uids = [] ){
        uids.forEach( uid => {
            const task = this._list[uid];
            if( !task.taskEndDate ){
                task.taskEndDate = new Date().toISOString();
            }
        });

        this.listArr.forEach( task => {
            if( !uids.includes( task.id ) ){
               this._list[task.id].taskEndDate = null;
            }
        });
    }
}
module.exports = Tasks;