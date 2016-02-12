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
    addModule: addModule,
    loadModulesFromList:fromList
};
