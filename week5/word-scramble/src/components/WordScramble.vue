<template>
  <div class="intro">
    <h3>{{ msg }}</h3>
    <div class="spacer"></div>
    <div v-if="gameOn" class="player">GAME ON, {{name}}!</div>
    <div v-if="startUp" class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text" id>Enter your player name:</span>
      </div>
      <div class="spacer"></div>
      <input type="text" class="form-control col-md-4" v-model="name" />
      <div class="spacer"></div>
      <button type="button" class="btn btn-dark" @click="gameOnFunc">Let's play</button>
      <div class="spacer"></div>
    </div>
    <div v-if="playGame">
      <div class="scrambledWord">
        Your mystery word is:
        <span>{{scrambledWord}}</span>
      </div>
      <div class="hint">
        Hint:
        <span>{{hint}}</span>
      </div>
      <div class="row">
        <input type="text" class="form-control col-md-4" v-model="answer" />
        <div class="spacer"></div>
        <button type="button" class="btn btn-dark" @click="submitAnswer">Submit Guess</button>
        <div class="spacer"></div>
      </div>
    </div>
    <div v-if="matchFound" class="successClass">
      <div class="alert alert-success col-md-5" role="alert">
        You got it! Nice work.
        <button type="button" class="btn btn-primary col-md-3">Play again</button>
      </div>
    </div>
    <div v-if="failure && !matchFound" class="failureClass">
      <div
        class="alert alert-danger col-md-5"
        role="alert"
      >Sorry, that is not correct. Please try again!</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WordScramble",
  props: {
    msg: String
  },
  data: function() {
    return {
      startUp: true,
      gameOn: false,
      playGame: false,
      wordIndex: null,
      name: "",
      answer: "",
      matchFound: false,
      failure: false,
      words: [
        [
          "gauge",
          "a measuring instrument for measuring and indicating a quantity such as the thickness of wire or the amount of rain"
        ],
        [
          "backfire",
          "a loud noise made by the explosion of fuel in the manifold or exhaust of an internal combustion engine"
        ],
        [
          "cone",
          "a shape whose base is a circle and whose sides taper up to a point"
        ],
        [
          "artist",
          " a person whose creative work shows sensitivity and imaginationn"
        ],
        ["syringe", "a medical instrument used to inject or withdraw fluids"],
        [
          "drum",
          "a musical percussion instrument; usually consists of a hollow cylinder with a membrane stretch across each end"
        ]
      ]
    };
  },
  methods: {
    gameOnFunc: function() {
      if (this.name.length > 0) {
        this.gameOn = true;
        this.playGame = true;
        this.startUp = false;
      } else {
        this.gameOn = false;
        this.playGame = false;
        this.startUp = true;
      }
      this.rand();
    },
    rand: function() {
      let rand = Math.floor(Math.random() * this.words.length) + 1;
      this.wordIndex = rand;
    },
    submitAnswer: function() {
      for (let word in this.words) {
        if (
          this.answer.toUpperCase() == this.words[word][0].toUpperCase() &&
          this.hint == this.words[word][1]
        ) {
          this.matchFound = true;
          this.failure = false;
          console.log(this.matchFound);
          console.log(this.failure);
        } else {
          this.matchFound = false;
          this.failure = true;
        }
      }
    }
  },
  computed: {
    scrambledWord: function() {
      let charArray = this.words[this.wordIndex][0].split("");
      let shuffled = charArray.sort(function() {
        return 50 - Math.random() * 100;
      });
      let joinedStr = shuffled.join("").toUpperCase();
      return joinedStr;
    },
    hint: function() {
      return this.words[this.wordIndex][1];
    }
  }
};
</script>

<style scoped>
.intro {
  text-decoration-style: double;
  text-align: left;
  padding-left: 50px;
}
.input-group {
  padding-top: 50px;
}
.spacer {
  padding-left: 40px;
}
.player {
  font-style: italic;
  padding-top: 50px;
}
.scrambledWord {
  padding-top: 50px;
  padding-bottom: 50px;
  font-weight: bold;
}
.hint {
  font-style: italic;
  padding-bottom: 40px;
}
.successClass {
  padding-top: 20px;
  padding-bottom: 20px;
}
.failureClass {
  padding-top: 20px;
  padding-bottom: 20px;
}
.row {
  padding-left: 16px;
}
</style>
