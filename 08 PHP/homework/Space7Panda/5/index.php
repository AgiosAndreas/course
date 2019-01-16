<?php

require_once 'config/init.php';

$itemsQuerry = $db->prepare("
    SELECT id, name, done
    FROM items
");

$itemsQuerry->execute();

$items = $itemsQuerry->rowCount() ? $itemsQuerry : [];

?>

<!DOCTYPE html>
<html lang="en" data-framework="javascript">
    <head>
        <meta charset="utf-8">
        <title>ex-08-05 • TodoMVC</title>
        <link rel="stylesheet" href="css/base.css">
        <link rel="stylesheet" href="css/index.css">
    </head>
    <body>
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <form action="src/add.php" method="post">
                    <input class="new-todo" 
                        name="name"  
                        placeholder="What needs to be done?" 
                        autocomplete="off" 
                        autofocus>
                </form>
            </header>
            <section class="main">
                <input id="toggle-all" class="toggle-all" type="checkbox">
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list">
                <?php foreach ($items as $item) : ?>
                    <li data-id="<?php echo $item['id']?>" 
                        class="<?php echo $item['done'] ? ' completed' :  ''?>">
                        <div class="view">
                            <a 
                                href="src/mark.php?id=<?php echo $item['id']?>&done=<?php echo $item['done']?>" 
                                class="check-box">
                                <input disabled
                                    class="toggle" 
                                    type="checkbox" 
                                    <?php echo $item['done'] ? 'checked' :  ''?>>
                                <label><?php echo $item['name'] ?></label>
                            </a>
                            </form>
                            <a class="destroy" href="src/delete.php?item=<?php echo $item['id']; ?>">
                            </a>
                        </div>
                    </li>
                <?php endforeach;?>
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
