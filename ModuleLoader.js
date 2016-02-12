var modules = [];
function addModule(name, module)
{
    modules.push(
        {
            "name": name,
            "module": module
        });
}
function fromList(rawModules)
{
    for (var i = 0; i < rawModules.length; i++)
    {
        m = rawModules[i];
        var module = resolve(m);
        if (module == null)
        {
            continue;
        }
        addModule(m.name, module);
        loadDependencies(m, module);
    }
}
function resolve(m)
{
    if (m.isActive)
    {
        console.log("Module " + m.name + " was resolved.");
        return require(m.path);
    }
    return null;
}

function loadDependencies(m, module)
{
    dependencies = [];
    for (var z = 0; z < m.dependencies.length; z++)
    {
        var depName = m.dependencies[z];
        for (var q = 0; q < modules.length; q++)
        {
            var mod = modules[q];
            if (depName === mod.name)
            {
                dependencies.push(mod.module);
            }
        }
    }

    functionName = 'module(';
    for (var i = 0; i < dependencies.length; i++)
    {
        functionName += "dependencies[" + i + "]";
        if (i != dependencies.length - 1)
        {
            functionName += ',';
        }
        else
        {
            functionName += ');';
        }
        eval(functionName);
    }
}

module.exports = {
    /**
     * @param name: the name of the module
     * @param module: the object or function of the module
     */
    addModule: addModule,
    /**
     * Loads modules from a list
     *
     * @param rawModules: an array that contains
     *      [
     *          {
     *              name: the name of the module
     *              isActive: should the module be loaded
     *              path: the directory path to load from
     *              dependencies: an array of module names (strings) that
     *                  this module require to be passed in when created
     *          }
     *      ]
     */
    loadModulesFromList:fromList
};
