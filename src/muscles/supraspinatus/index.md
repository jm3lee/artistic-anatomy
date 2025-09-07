{% extends "src/templates/template.html.jinja" %}
{% block content %}
[:man: Reviewed](../background/icons.md)

{% from "src/templates/macros.jinja" import summary %}

{{summary("supraspinatus")}}

<img src="https://brianleeart.sfo3.cdn.digitaloceanspaces.com/richer/supraspinatus.jpg"
alt="Supraspinatus, Richer"
loading="lazy"/>

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Supraspinatus_muscle)
* {{ link_icon_title('gf') }} 159
{% endblock %}
