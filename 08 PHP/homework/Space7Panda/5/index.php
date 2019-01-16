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
                <form action="add.php" method="post">
                    <input class="new-todo" placeholder="What needs to be done?" autofocus>
                </form>
			</header>
			<section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list">
                    <li data-id="1547637809601" class="">
                        <div class="view">
                            <input class="toggle" type="checkbox">
                            <label>Eat food</label>
                            <button class="destroy"></button>
                        </div>
                    </li>
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
