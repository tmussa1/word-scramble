<template>
  <div class="intro">
    <!-- Passed in as a prop from App.vue -->
    <h3>{{ msg }}</h3>
    <div class="spacer"></div>
    <!-- Renders after user is signed in -->
    <div v-if="gameOn" class="player">Game on, {{name}}!</div>
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
    <!-- Scrambled word is presented -->
    <div v-if="playGame">
      <div class="scrambledWord">
        Your mystery word is:
        <span>{{scrambledWord}}</span>
      </div>
      <div class="hint">
        <!-- Hint is presented -->
        Hint:
        <span>{{hint}}</span>
      </div>
      <div class="row">
        <input
          type="text"
          class="form-control col-md-4"
          v-model="answer"
          v-on:keyup.enter="submitAnswer"
        />
        <div class="spacer"></div>
        <button type="button" class="btn btn-dark" @click="submitAnswer">Submit Guess</button>
        <div class="spacer"></div>
      </div>
    </div>
    <!-- Displays if user guesses right -->
    <div v-if="matchFound === true" class="successClass">
      <div :class="alertSucess" role="alert">
        You got it! Nice work.
        <button
          type="button"
          class="btn btn-primary col-md-3"
          @click="playAgain"
        >Play again</button>
      </div>
    </div>
    <!-- Displays if user guesses wrong -->
    <div v-if="failure === true" class="failureClass">
      <div :class="alertFailure" role="alert">Sorry, that is not correct. Please try again!</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WordScramble",
  props: {
    msg: String
  },
  /**
   * Several flags to alternate the divs and collecting data
   * The words array contains the data to play the game against
   * Feedback styling is done with class binding
   */
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
      alertSucess: "alert alert-success col-md-5",
      alertFailure: "alert alert-danger col-md-5",
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
    /**
     * If the user entered a valid name (more than one letter), the game div
     * will be displayed
     */
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
    /**
     * Generates a random number spanning the words array
     */
    rand: function() {
      let rand = Math.floor(Math.random() * this.words.length);
      this.wordIndex = rand;
    },
    submitAnswer: function() {
      let word = 0;
      /**
       * The reason to do a second matching by hint is to make sure that the user doesn't
       * keep giving answers he gave to a previous question. Doing matching by the current hint
       * prevents that from happening
       */
      for (word = 0; word < this.words.length; word++) {
        if (
          this.answer.toUpperCase().trim() ==
            this.words[word][0].toUpperCase().trim() &&
          this.hint.trim() == this.words[word][1].trim()
        ) {
          this.matchFound = true;
          this.failure = false;
          break;
        }
      }

      /**
       * If the loop iterates to the end, no match is found
       */
      if (word >= this.words.length) {
        this.matchFound = false;
        this.failure = true;
      }
    },
    /**
     * Resets the scrambled word and hint
     * If random generator sets the value to the index we have seen in the session,
     * it keeps iterating till it finds a different index. This ensures not having the same
     *  word in a row
     */
    playAgain: function() {
      let currentIndex = this.wordIndex;
      this.rand();

      while (currentIndex === this.wordIndex) {
        this.rand();
      }

      this.scrambledWord;
    }
  },
  computed: {
    /**
     * Shuffles characters by using a random number generator and
     * joins them back to form a word
     */
    scrambledWord: function() {
      let charArray = this.words[this.wordIndex][0].split("");
      let shuffled = charArray.sort(function() {
        return 50 - Math.random() * 100;
      });
      let joinedStr = shuffled.join("").toUpperCase();
      return joinedStr;
    },
    /**
     * The second element of the 2D array is hint/description
     */
    hint: function() {
      return this.words[this.wordIndex][1];
    }
  }
};
</script>

<style scoped>
/* Used some bootstrap styling */
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
