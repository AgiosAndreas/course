<?php
/* Smarty version 3.1.33, created on 2019-01-17 13:42:20
  from '/home/mgg/Documents/course/08 PHP/homework/Space7Panda/5/public/templates/index.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.33',
  'unifunc' => 'content_5c406a1c4e0302_13765978',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '1df5ec313511bbeba6efaf627ab2dd2b7502986d' => 
    array (
      0 => '/home/mgg/Documents/course/08 PHP/homework/Space7Panda/5/public/templates/index.tpl',
      1 => 1547725267,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5c406a1c4e0302_13765978 (Smarty_Internal_Template $_smarty_tpl) {
?><!DOCTYPE html>
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
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['items']->value, 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
?>
                        <li>
                            <div class="view">
                                <input class="toggle" type="checkbox">
                                <label><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</label>
                                <a class="destroy" href="src/delete.php?item=<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
"></a>
                            </div>
                        </li>
                    <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
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
<?php }
}
