<!DOCTYPE html>
<html lang="en" data-framework="javascript">
    <head>
        <meta charset="utf-8">
        <title>ex-08-05 • TodoMVC</title>
        <link rel="stylesheet" href="css/index.css">
    </head>
    <body>
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <form action="src/add.php" method="post">
                    <input class="new-todo" name="name" placeholder="What needs to be done?" autocomplete="off" autofocus>
                </form>
            </header>
            <section class="main">
                <input id="toggle-all" class="toggle-all" type="checkbox">
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list">
                    {foreach from=$items item=item}
                        <li class='{if $item.done == 1} completed {/if}'>
                            <div class="view">
                                <input class="toggle" 
                                    onclick="location.href = 'src/mark.php?id={$item.id}&done={$item.done}'" 
                                    type="checkbox" {if $item.done == 1} checked {/if}>
                                <label>{$item.name}</label>
                                <a class="destroy" href="src/delete.php?item={$item.id}"></a>
                            </div>
                        </li>
                    {/foreach}
                </ul>
            </section>
            <footer class="footer">
                <span class="todo-count"></span>
                <ul class="filters">
                    <li>
                        <a href="#/" class="selected">All</a>
                    </li>
                    <li>
                        <a href="#/active">Active</a>
                    </li>
                    <li>
                        <a href="#/completed">Completed</a>
                    </li>
                </ul>
                <button class="clear-completed">Clear completed</button>
            </footer>
        </section>
    </body>
</html>
