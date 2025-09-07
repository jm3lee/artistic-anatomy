{% extends "src/templates/template.html.jinja" %}
{% block content %}
Learn to recognize the surface points that map the body.
Study [Bones](/bones/) and [Muscles](/muscles/) to understand
what shapes them.

<div id="landmarks-indextree" class="indextree-root"
     data-src="/static/index/landmarks-indextree.json"></div>
{% endblock %}
