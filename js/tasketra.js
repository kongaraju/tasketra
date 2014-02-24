/**
 * @author Rajukonga
 */

function tasketra(){
	this._taskLists = {};
};

tasketra.prototype = (function(){
	
	var TaskList = function(name,id){
		this._tasks = {};
		this.name = name;
		this._id = id;
	};
	
	TaskList.prototype=(function(){

		return {
			constructor : TaskList,
			add:function(name){
				var uuid = getUUID();
				var task = new Task(name,uuid);
				this._tasks[uuid] = task;
				return task;	
			},
			remove:function(id){
				delete this.get(id);
			},
			update:function(id){
				var task = this.get(id);
			},
			get:function(id){
				return this._tasks[id];
			},
			getTasks:function(){
				var tasks=[];
				for( name in this._tasks){
					tasks.push(this._tasks[name]);
				}
				return tasks;
			},
			info:function(){
				return this._id;
			}
		};
		
	})();
	
	
	
	
	var Task = function(name,id){
		this.name = name;
		this._id = id;
	};
	Task.prototype.set = function(){
		
	};
	Task.prototype.get=function(name){
		if(name == "id"){
			return this._id;
		}
	};
	
	var getUUID = function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
				function(c) {
					var r = Math.random() * 16 | 0, v = c == 'x' ? r
							: (r & 0x3 | 0x8);
					return v.toString(16);
				});
	};
	
	
	 return {
        constructor:tasketra,
        
        addTasklist: function(name){
        	var uuid = getUUID();
        	var taskList = new TaskList(name,uuid);
        	this._taskLists[uuid] = taskList;
        	
        	return taskList;
        },
        removeTasklist :function(id){
        	delete this.get(id);
        },
        get:function(id){
        	return this._taskLists[id];
        }
	 };
	
})();