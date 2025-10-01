<template>
  <v-card class="construction-card pa-6" elevation="4" tile>
    <div class="animation-wrap">
      <!-- Небо и движущиеся облака -->
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid meet"
        class="scene"
      >
        <defs>
          <linearGradient id="groundGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#f7f9fb" />
            <stop offset="100%" stop-color="#eef3f8" />
          </linearGradient>
          <linearGradient id="sunGradient" x1="0" x2="1">
            <stop offset="0%" stop-color="#ffd54f" />
            <stop offset="100%" stop-color="#ffb74d" />
          </linearGradient>
        </defs>

        <!-- фон -->
        <rect
          x="0"
          y="0"
          width="1200"
          height="400"
          fill="url(#groundGradient)"
        />

        <!-- солнце -->
        <g class="sun" transform="translate(100,80)">
          <circle cx="0" cy="0" r="26" fill="url(#sunGradient)" />
        </g>

        <!-- облака (двигаются слева-направо) -->
        <g class="cloud cloud1" transform="translate(-200,60)">
          <ellipse
            cx="0"
            cy="0"
            rx="60"
            ry="30"
            fill="#ffffff"
            opacity="0.95"
          />
          <ellipse
            cx="40"
            cy="-10"
            rx="50"
            ry="28"
            fill="#ffffff"
            opacity="0.95"
          />
          <ellipse
            cx="80"
            cy="0"
            rx="60"
            ry="30"
            fill="#ffffff"
            opacity="0.95"
          />
        </g>

        <g class="cloud cloud2" transform="translate(-100,30)">
          <ellipse
            cx="0"
            cy="0"
            rx="40"
            ry="20"
            fill="#ffffff"
            opacity="0.95"
          />
          <ellipse
            cx="30"
            cy="-10"
            rx="35"
            ry="18"
            fill="#ffffff"
            opacity="0.95"
          />
          <ellipse
            cx="60"
            cy="0"
            rx="40"
            ry="20"
            fill="#ffffff"
            opacity="0.95"
          />
        </g>

        <!-- грунт -->
        <rect x="0" y="300" width="1200" height="100" fill="#f1f5f9" />

        <!-- дорожное покрытие / площадка -->
        <rect
          x="80"
          y="320"
          width="1040"
          height="40"
          rx="6"
          fill="#fff"
          opacity="0.9"
          stroke="#e3e8ee"
        />

        <!-- Блоки/кирпичи которые перевозятся -->
        <g class="blocks">
          <rect
            class="block block1"
            x="540"
            y="280"
            width="60"
            height="34"
            rx="4"
            fill="#ff7043"
          />
          <rect
            class="block block2"
            x="620"
            y="280"
            width="60"
            height="34"
            rx="4"
            fill="#ff8a65"
          />
        </g>

        <!-- Строительный кран слева -->
        <g class="crane" transform="translate(220,240)">
          <!-- опора -->
          <rect
            x="-20"
            y="-160"
            width="40"
            height="160"
            rx="4"
            fill="#37474f"
            opacity="0.95"
          />
          <!-- платформа -->
          <rect x="-40" y="0" width="120" height="14" rx="3" fill="#455a64" />
          <!-- стрела (вращается слегка вперед-назад) -->
          <g class="boom" transform="translate(20,-150)">
            <rect x="0" y="-8" width="300" height="16" rx="6" fill="#607d8b" />
            <!-- кабина -->
            <rect
              x="-42"
              y="-24"
              width="42"
              height="28"
              rx="4"
              fill="#455a64"
            />
            <circle cx="-21" cy="-10" r="5" fill="#90a4ae" />
            <!-- трос и крюк (трос двигается вверх-вниз) -->
            <g class="hook-group" transform="translate(280,0)">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="80"
                stroke="#263238"
                stroke-width="3"
                class="rope"
              />
              <rect
                x="-10"
                y="80"
                width="20"
                height="20"
                rx="3"
                fill="#263238"
                class="hook"
              />
            </g>
          </g>
        </g>

        <!-- Подъёмный автомобиль (едет справа-налево) -->
        <g class="truck" transform="translate(980,310)">
          <rect x="0" y="-32" width="120" height="40" rx="6" fill="#546e7a" />
          <rect x="8" y="-64" width="56" height="36" rx="4" fill="#607d8b" />
          <circle cx="30" cy="-6" r="12" fill="#263238" />
          <circle cx="90" cy="-6" r="12" fill="#263238" />
          <rect x="34" y="-44" width="48" height="8" rx="2" fill="#90a4ae" />
        </g>

        <!-- Добавим несколько маркеров "работающих людей" (например, копает экскаватор) -->
        <g class="excavator" transform="translate(720,300)">
          <rect x="0" y="-20" width="60" height="20" rx="4" fill="#ffb74d" />
          <circle cx="16" cy="0" r="10" fill="#263238" />
          <g class="arm" transform="translate(50,-10)">
            <rect x="0" y="0" width="46" height="8" rx="3" fill="#ffb74d" />
            <rect
              x="44"
              y="-10"
              width="14"
              height="14"
              rx="3"
              fill="#ff8a65"
              class="bucket"
            />
          </g>
        </g>
      </svg>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ConstructionAnimation",
  mounted() {
    // Ничего не нужно запускать вручную — всё в CSS-анимациях.
  },
};
</script>

<style scoped>
.construction-card {
  overflow: hidden;
  border-radius: 12px;
  background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 220px;
}

/* контейнер для SVG */
.animation-wrap {
  width: 100%;
  max-width: 980px;
}

/* SVG адаптивен */
.scene {
  width: 100%;
  height: 220px;
  display: block;
}

/* длительность всей "циклической" анимации — 10s; repeat infinite */

@keyframes cloud-move-1 {
  0% {
    transform: translateX(-240px);
    opacity: 0.98;
  }
  10% {
    opacity: 1;
  }
  50% {
    transform: translateX(1300px);
    opacity: 1;
  }
  100% {
    transform: translateX(1400px);
    opacity: 0.98;
  }
}
@keyframes cloud-move-2 {
  0% {
    transform: translateX(-150px);
    opacity: 0.95;
  }
  50% {
    transform: translateX(1100px);
    opacity: 0.98;
  }
  100% {
    transform: translateX(1200px);
    opacity: 0.95;
  }
}

/* солнце нет сильной анимации, но слегка вращаем лучи (любой эффект) */
@keyframes sun-sway {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(6deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* кран: стрела качается; крюк поднимается и опускается */
@keyframes boom-swing {
  0% {
    transform: rotate(-6deg) translateY(0);
  }
  25% {
    transform: rotate(4deg) translateY(0);
  }
  50% {
    transform: rotate(-2deg) translateY(0);
  }
  75% {
    transform: rotate(5deg) translateY(0);
  }
  100% {
    transform: rotate(-6deg) translateY(0);
  }
}
@keyframes hook-lift {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(40px);
  }
  40% {
    transform: translateY(0px);
  }
  60% {
    transform: translateY(40px);
  }
  80% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(0);
  }
}

/* грузовик едет справа-налево */
@keyframes truck-drive {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  10% {
    transform: translateX(-20px);
  }
  40% {
    transform: translateX(-520px);
    opacity: 1;
  }
  70% {
    transform: translateX(-900px);
    opacity: 0.9;
  }
  100% {
    transform: translateX(-1100px);
    opacity: 0;
  }
}

/* экскаватор движение ковша */
@keyframes excavator-dig {
  0% {
    transform: rotate(0deg) translateY(0);
  }
  30% {
    transform: rotate(-18deg) translateY(-6px);
  }
  60% {
    transform: rotate(0deg) translateY(0);
  }
  100% {
    transform: rotate(0deg) translateY(0);
  }
}

/* выделим элементы и привяжем анимации с длительностью 10s */
.cloud1 {
  animation: cloud-move-1 10s linear infinite;
}
.cloud2 {
  animation: cloud-move-2 10s linear infinite;
  animation-delay: 1.5s;
}

.sun {
  transform-origin: center;
  animation: sun-sway 10s ease-in-out infinite;
}

/* кран */
.crane .boom {
  transform-origin: 20px -8px;
  animation: boom-swing 10s ease-in-out infinite;
}
.crane .hook-group {
  animation: hook-lift 10s ease-in-out infinite;
  transform-origin: center;
}

/* грузовик */
.truck {
  animation: truck-drive 10s linear infinite;
}

/* экскаватор */
.excavator .arm {
  transform-origin: 0 0;
  animation: excavator-dig 10s ease-in-out infinite;
}

/* блоки немного подпрыгивают при захвате крюком — синхронизируем с hook-lift */
@keyframes block-bounce {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-26px);
  }
  40% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-18px);
  }
  80% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
}
.block1 {
  animation: block-bounce 10s ease-in-out infinite;
  animation-delay: 0.2s;
  transform-origin: center;
}
.block2 {
  animation: block-bounce 10s ease-in-out infinite;
  animation-delay: 0.35s;
  transform-origin: center;
}

/* плавные переходы и масштаб при hover (не обязательно) */
.construction-card:hover {
  transform: translateY(-4px);
  transition: transform 0.25s ease;
}
</style>
