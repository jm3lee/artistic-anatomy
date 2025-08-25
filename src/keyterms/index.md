There are numerous anatomical terms in medical texts, but not all are relevant
to artistic anatomy. Since artists focus on superficial muscles and bones—those
visible on the surface—only certain terms are necessary. Most of the time,
artists only need to learn terminology related to the location of muscles,
bones, and bony landmarks to effectively apply anatomical knowledge in their
work.

## Terms

```{=html}
{#
<dl>
{% set keyterms = read_json("build/keyterms/index.json") %}
{% for k, v in keyterms.items() | sort %}
  <dt id="{{ k }}">{{ get_desc('v')['term'] }}</dt>
  <dd>
    {{ render_jinja(get_desc('v')['def']) }}
  </dd>
  {% if 'ex' in v %}
  <dd>
    Examples:
    <ul class="examples">
    {% for ex in get_desc('v')['ex'] %}
      <li>{{ render_jinja(ex) }}</li>
    {% endfor %}
    </ul>
  </dd>
  {% endif %}
{% endfor %}
</dl>
#}
```

## References

[Anatomical Terminology (Wikipedia)](https://en.wikipedia.org/wiki/Anatomical_terminology#Standard_terms)
