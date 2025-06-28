---
title: Key Terms
author: Brian Lee
pubdate: Sat May 10 2025
---

There are numerous anatomical terms in medical texts, but not all are relevant
to artistic anatomy. Since artists focus on superficial muscles and bones—those
visible on the surface—only certain terms are necessary. Most of the time,
artists only need to learn terminology related to the location of muscles,
bones, and bony landmarks to effectively apply anatomical knowledge in their
work.

## Terms

<dl>
{% for k, v in read_json("build/background/key_terms.json").items() %}
  <dt id="{{k}}">{{v['term']}}</dt>
  <dd>
    {{render_jinja(v['def'])}}
  </dd>
  {% if 'ex' in v %}
  <dd>
    Examples:
    <ul class="examples">
    {% for ex in v['ex'] %}
      <li>{{render_jinja(ex)}}</li>
    {% endfor %}
    </ul>
  </dd>
  {% endif %}
{% endfor %}
</dl>

## References

[Anatomical Terminology (Wikipedia)](https://en.wikipedia.org/wiki/Anatomical_terminology#Standard_terms)
