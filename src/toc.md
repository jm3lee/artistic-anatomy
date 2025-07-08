---
title: Table of Contents
toc: false
id: toc
citation: table of contents
---

<style>
ul {
  list-style: none;
}
</style>

## Background

* {{anaplanes|linktitle}}
* [:notebook: Icons](background/icons.md)
* {{keyterms|linktitle}}
* [:notebook: Muscle Origin vs. Insertion](keyterms/muscle-origin-and-insertion.md)
* [:notebook: Reponsible Use of Artificial Intelligence (AI)](background/responsible-use-of-ai.md)
* [:notebook: Tendon vs. Ligament](background/tendon-vs-ligament.md)

## Head

* [:bone: Zygomatic Arch](zygomatic-arch.md)
* [:star: Supraorbital Ridge](supraorbital-ridge.md)
* [:star: Temporal Ridge](temporal-ridge.md)

## Bones

{% macro render_list(items) %}
  {% for item in items %}
    {% if item is string %}
      <li>{{ render_jinja(item) }}</li>
    {% elif item is iterable %}
      <li>
        <ul>{{ render_list(item) }}</ul>
      </li>
    {% endif %}
  {% endfor %}
{% endmacro %}

```{=html}
<ul>
{{render_list(read_yaml("src/bones/clavicle/toc.yml"))}}
{{render_list(read_yaml("src/bones/femur/toc.yml"))}}
{{render_list(read_yaml("src/bones/foot/toc.yml"))}}
{{render_list(read_yaml("src/bones/humerus/toc.yml"))}}
{{render_list(read_yaml("src/bones/patella/toc.yml"))}}
{{render_list(read_yaml("src/bones/pelvis/toc.yml"))}}
{{render_list(read_yaml("src/bones/radius/toc.yml"))}}
{{render_list(read_yaml("src/bones/scapula/toc.yml"))}}
{{render_list(read_yaml("src/bones/spine/toc.yml"))}}
{{render_list(read_yaml("src/bones/sternum/toc.yml"))}}
{{render_list(read_yaml("src/bones/tibia/toc.yml"))}}
{{render_list(read_yaml("src/bones/fibula/toc.yml"))}}
{{render_list(read_yaml("src/bones/ulna/toc.yml"))}}
</ul>
```

## Joints

* {{glenohumeral_joint|linktitle}}
* {{radioulnar_joints|linktitle}}
* {{synovial_joints|linktitle}}

## Muscles

```python
include("build/static/index/muscles.md")
```

## Tendons and Ligaments

* [:link: Iliotibial (IT) Band](iliotibial-it-band.md)
* [:link: Linea Alba](linea_alba.md)

## Misc. Landmarks

* [:round_pushpin: Infraclavicular Fossa](infraclavicular_fossa.md)

## Movements

* [Holding a Pole](movements/holding-a-pole.md)
* [Knee Flexion and Extension](movements/knee-flexion-and-extension.md)
* [Throwing](movements/throwing.md)

## Appendix

* [:notebook: Anatomical Movement Encoding System](appendix/anatomical-movement-encoding-system.md)
* [:notebook: Arm Movements](appendix/arm-movements.md)
* [:notebook: Bony Landmarks](appendix/bony-landmarks.md)
* [:notebook: Elbow Flexors](elbow_flexors.md)
* [:notebook: Warm Areas](appendix/warm-areas.md)
* [:notebook: Warm and Cool](appendix/warm-and-cool.md)
* [:notebook: Wrist Flexor Group](wrist-flexor-group.md)
* [:weight_lifting: Dumbbell Rows](appendix/weight-training/dumbbell-rows.md)
* [:weight_lifting: Hammer Curl](appendix/weight-training/hammer-curl.md)

## Resources

* [Resources](resources/)
  * [:closed_book: Anatomy Lessons from the Great Masters](resources/anatomy-lessons-from-the-great-masters.md)
  * [:closed_book: Art Models](resources/artmodels.md)
  * [:closed_book: Artistic Anatomy by Paul Richer](resources/richer/)
  * [:closed_book: Classical Life Drawing Studio: Lessons & Teachings in the Art of Figure Drawing](resources/classical-life-drawing-studio.md)
  * [:closed_book: Strength Training Anatomy by Frédéric Delavier](resources/delavier-strength-training-anatomy.md)
  * [:closed_book: Study Questions](resources/study-questions.md)
