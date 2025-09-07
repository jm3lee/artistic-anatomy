{% extends "src/templates/template.html.jinja" %}
{% block content %}
Discover books that strengthen your understanding of the figure.
For complementary links and articles, visit [Resources](/resources/).

<div id="books-indextree" class="indextree-root"
     data-src="/static/index/books-indextree.json"></div>
{% endblock %}
