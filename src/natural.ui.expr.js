(function(window, $){
	N.version['Natural-Expr'] = 'v0.1.0';

	(function(N){
		"use strict";

		function peg$subclass(child, parent) {
			function C() { this.constructor = child; }
			C.prototype = parent.prototype;
			child.prototype = new C();
		}

		function peg$SyntaxError(message, expected, found, location) {
			this.message = message;
			this.expected = expected;
			this.found = found;
			this.location = location;
			this.name = "SyntaxError";

			if (typeof Error.captureStackTrace === "function") {
				Error.captureStackTrace(this, peg$SyntaxError);
			}
		}

		peg$subclass(peg$SyntaxError, Error);

		peg$SyntaxError.buildMessage = function(expected, found) {
			var DESCRIBE_EXPECTATION_FNS = {
				literal: function(expectation) {
					return "\"" + literalEscape(expectation.text) + "\"";
				},

				class: function(expectation) {
					var escapedParts = expectation.parts.map(function(part) {
						return Array.isArray(part)
							? classEscape(part[0]) + "-" + classEscape(part[1])
							: classEscape(part);
					});

					return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
				},

				any: function() {
					return "any character";
				},

				end: function() {
					return "end of input";
				},

				other: function(expectation) {
					return expectation.description;
				},

				not: function(expectation) {
					return "not " + describeExpectation(expectation.expected);
				}
			};

			function hex(ch) {
				return ch.charCodeAt(0).toString(16).toUpperCase();
			}

			function literalEscape(s) {
				return s
					.replace(/\\/g, "\\\\")
					.replace(/"/g,	"\\\"")
					.replace(/\0/g, "\\0")
					.replace(/\t/g, "\\t")
					.replace(/\n/g, "\\n")
					.replace(/\r/g, "\\r")
					.replace(/[\x00-\x0F]/g,					function(ch) { return "\\x0" + hex(ch); })
					.replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"	+ hex(ch); });
			}

			function classEscape(s) {
				return s
					.replace(/\\/g, "\\\\")
					.replace(/\]/g, "\\]")
					.replace(/\^/g, "\\^")
					.replace(/-/g,	"\\-")
					.replace(/\0/g, "\\0")
					.replace(/\t/g, "\\t")
					.replace(/\n/g, "\\n")
					.replace(/\r/g, "\\r")
					.replace(/[\x00-\x0F]/g,					function(ch) { return "\\x0" + hex(ch); })
					.replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"	+ hex(ch); });
			}

			function describeExpectation(expectation) {
				return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
			}

			function describeExpected(expected) {
				var descriptions = expected.map(describeExpectation);
				var i, j;

				descriptions.sort();

				if (descriptions.length > 0) {
					for (i = 1, j = 1; i < descriptions.length; i++) {
						if (descriptions[i - 1] !== descriptions[i]) {
							descriptions[j] = descriptions[i];
							j++;
						}
					}
					descriptions.length = j;
				}

				switch (descriptions.length) {
					case 1:
						return descriptions[0];

					case 2:
						return descriptions[0] + " or " + descriptions[1];

					default:
						return descriptions.slice(0, -1).join(", ")
							+ ", or "
							+ descriptions[descriptions.length - 1];
				}
			}

			function describeFound(found) {
				return found ? "\"" + literalEscape(found) + "\"" : "end of input";
			}

			return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
		};

		function peg$parse(input, options) {
			options = options !== undefined ? options : {};

			var peg$FAILED = {};

			var peg$startRuleFunctions = { 구문: peg$parse구문 };
			var peg$startRuleFunction = peg$parse구문;

			var peg$c0 = "{{";
			var peg$c1 = "}}";
			var peg$c2 = "{";
			var peg$c3 = "}";
			var peg$c4 = ":";
			var peg$c5 = ".";
			var peg$c6 = "[";
			var peg$c7 = "]";
			var peg$c8 = "(";
			var peg$c9 = ")";
			var peg$c10 = ",";
			var peg$c11 = "true";
			var peg$c12 = "false";
			var peg$c13 = "N";
			var peg$c14 = "Math";
			var peg$c15 = "===";
			var peg$c16 = "!==";
			var peg$c17 = "==";
			var peg$c18 = "!=";
			var peg$c19 = "<=";
			var peg$c20 = ">=";
			var peg$c21 = "&&";
			var peg$c22 = "||";
			var peg$c23 = "+";
			var peg$c24 = "-";
			var peg$c25 = "*";
			var peg$c26 = "/";
			var peg$c27 = "<";
			var peg$c28 = ">";
			var peg$c29 = "?";
			var peg$c30 = "\"";
			var peg$c31 = "'";

			var peg$r0 = /^[^{}]/;
			var peg$r1 = /^[a-zA-Z\u3131-\uD7A3_]/;
			var peg$r2 = /^[a-zA-Z\u3131-\uD7A30-9_]/;
			var peg$r3 = /^[\t\n ]/;
			var peg$r4 = /^[0-9]/;
			var peg$r5 = /^[^"]/;
			var peg$r6 = /^[^']/;

			var peg$e0 = peg$classExpectation(["{", "}"], true, false);
			var peg$e1 = peg$literalExpectation("{{", false);
			var peg$e2 = peg$literalExpectation("}}", false);
			var peg$e3 = peg$literalExpectation("{", false);
			var peg$e4 = peg$literalExpectation("}", false);
			var peg$e5 = peg$literalExpectation(":", false);
			var peg$e6 = peg$literalExpectation(".", false);
			var peg$e7 = peg$literalExpectation("[", false);
			var peg$e8 = peg$literalExpectation("]", false);
			var peg$e9 = peg$literalExpectation("(", false);
			var peg$e10 = peg$literalExpectation(")", false);
			var peg$e11 = peg$literalExpectation(",", false);
			var peg$e12 = peg$classExpectation([["a", "z"], ["A", "Z"], ["\u3131", "\uD7A3"], "_"], false, false);
			var peg$e13 = peg$classExpectation([["a", "z"], ["A", "Z"], ["\u3131", "\uD7A3"], ["0", "9"], "_"], false, false);
			var peg$e14 = peg$literalExpectation("true", false);
			var peg$e15 = peg$literalExpectation("false", false);
			var peg$e16 = peg$literalExpectation("N", false);
			var peg$e17 = peg$literalExpectation("Math", false);
			var peg$e18 = peg$classExpectation(["\t", "\n", " "], false, false);
			var peg$e19 = peg$literalExpectation("===", false);
			var peg$e20 = peg$literalExpectation("!==", false);
			var peg$e21 = peg$literalExpectation("==", false);
			var peg$e22 = peg$literalExpectation("!=", false);
			var peg$e23 = peg$literalExpectation("<=", false);
			var peg$e24 = peg$literalExpectation(">=", false);
			var peg$e25 = peg$literalExpectation("&&", false);
			var peg$e26 = peg$literalExpectation("||", false);
			var peg$e27 = peg$literalExpectation("+", false);
			var peg$e28 = peg$literalExpectation("-", false);
			var peg$e29 = peg$literalExpectation("*", false);
			var peg$e30 = peg$literalExpectation("/", false);
			var peg$e31 = peg$literalExpectation("<", false);
			var peg$e32 = peg$literalExpectation(">", false);
			var peg$e33 = peg$literalExpectation("?", false);
			var peg$e34 = peg$classExpectation([["0", "9"]], false, false);
			var peg$e35 = peg$literalExpectation("\"", false);
			var peg$e36 = peg$classExpectation(["\""], true, false);
			var peg$e37 = peg$literalExpectation("'", false);
			var peg$e38 = peg$classExpectation(["'"], true, false);

			var peg$f0 = function(e) { return e.join(""); };
			var peg$f1 = function(s) {
				var result = s.join("");
				return result;
			};
			var peg$f2 = function(e) { return e.charAt(0); };
			var peg$f3 = function(e) { return e; };
			var peg$f4 = function(left, right) {
				var op, result = left;
					if(right.length > 0){
					for(var i = 0; i < right.length; i++){
								op = right[i];
								switch(op[1]){
										case "+":
										result = result + op[3];
										break;
										case "-":
										result = result - op[3];
										break;
										case "*":
										result = result * op[3];
										break;
										case "/":
										result = result / op[3];
										break;
										case "<":
										result = result < op[3];
										break;
										case ">":
										result = result > op[3];
										break;
										case "==":
										result = result == op[3];
										break;
										case "<=":
										result = result <= op[3];
										break;
										case ">=":
										result = result >= op[3];
										break;
										case "!=":
										result = result != op[3];
										break;
										case "&&":
										result = result && op[3];
										break;
										case "||":
										result = result || op[3];
										break;
										case "===":
										result = result === op[3];
										break;
										case "!==":
										result = result !== op[3];
										break;
										case "?":
										result = result ? op[3] : op[7];
										break;
								}
							}
					}
				return result;
			};
			var peg$f5 = function(e, attrs) {
				var attr, result = e;
					if(attrs.length > 0){
						for(var i = 0; i < attrs.length; i++){
								attr = attrs[i];
									switch(attr.type){
										case 'attr':
											result = result[attr.name];
											break;
											case 'fn':
											result = result[attr.name].apply(result, attr.params);
											break;
									}
							}
					}
					return result;
			};
			var peg$f6 = function(attr) { return { type: 'attr', name: attr }; };
			var peg$f7 = function(e) { return { type: 'attr', name: e }; };
			var peg$f8 = function(fn, p) { return window[fn].apply(window, p); };
			var peg$f9 = function(attr, p) { return { type: 'fn', name: attr.name, params: p }; };
			var peg$f10 = function(p, ps) {
				var params = [];
					params.push(p);
					for(var i = 0; i < ps.length; i++){
						params.push(ps[i][3]);
					}

					return params;
			};
			var peg$f11 = function(w, w2) {
				return w + w2.join("");
			};
			var peg$f12 = function() { return true; };
			var peg$f13 = function() { return false; };
			var peg$f14 = function() { return N; };
			var peg$f15 = function() { return Math; };
			var peg$f16 = function(n1, dot, n2) {
				var num = Number(n1.join("") + (dot ? "." : "") + (n2 ? n2.join("") : ""), 10);
				return num
			};
			var peg$f17 = function(s) {
				return s.join("");
			};
			var peg$f18 = function(e) { return this[e]; };

			var peg$currPos = 0;
			var peg$savedPos = 0;
			var peg$posDetailsCache = [{ line: 1, column: 1 }];
			var peg$expected = [];
			var peg$silentFails = 0;

			var peg$resultsCache = {};

			var peg$result;

			if ("startRule" in options) {
				if (!(options.startRule in peg$startRuleFunctions)) {
					throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
				}

				peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
			}

			function text() {
				return input.substring(peg$savedPos, peg$currPos);
			}

			function offset() {
				return peg$savedPos;
			}

			function range() {
				return [peg$savedPos, peg$currPos];
			}

			function location() {
				return peg$computeLocation(peg$savedPos, peg$currPos);
			}

			function expected(description, location) {
				location = location !== undefined
					? location
					: peg$computeLocation(peg$savedPos, peg$currPos);

				throw peg$buildStructuredError(
					[peg$otherExpectation(description)],
					input.substring(peg$savedPos, peg$currPos),
					location
				);
			}

			function error(message, location) {
				location = location !== undefined
					? location
					: peg$computeLocation(peg$savedPos, peg$currPos);

				throw peg$buildSimpleError(message, location);
			}

			function peg$literalExpectation(text, ignoreCase) {
				return { type: "literal", text: text, ignoreCase: ignoreCase };
			}

			function peg$classExpectation(parts, inverted, ignoreCase) {
				return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
			}

			function peg$anyExpectation() {
				return { type: "any" };
			}

			function peg$endExpectation() {
				return { type: "end" };
			}

			function peg$otherExpectation(description) {
				return { type: "other", description: description };
			}

			function peg$computePosDetails(pos) {
				var details = peg$posDetailsCache[pos];
				var p;

				if (details) {
					return details;
				} else {
					p = pos - 1;
					while (!peg$posDetailsCache[p]) {
						p--;
					}

					details = peg$posDetailsCache[p];
					details = {
						line: details.line,
						column: details.column
					};

					while (p < pos) {
						if (input.charCodeAt(p) === 10) {
							details.line++;
							details.column = 1;
						} else {
							details.column++;
						}

						p++;
					}

					peg$posDetailsCache[pos] = details;

					return details;
				}
			}

			var peg$VALIDFILENAME = typeof options.filename === "string" && options.filename.length > 0;
			function peg$computeLocation(startPos, endPos) {
				var loc = {};

				if ( peg$VALIDFILENAME ) loc.filename = options.filename;

				var startPosDetails = peg$computePosDetails(startPos);
				loc.start = {
					offset: startPos,
					line: startPosDetails.line,
					column: startPosDetails.column
				};

				var endPosDetails = peg$computePosDetails(endPos);
				loc.end = {
					offset: endPos,
					line: endPosDetails.line,
					column: endPosDetails.column
				};

				return loc;
			}

			function peg$begin() {
				peg$expected.push({ pos: peg$currPos, variants: [] });
			}

			function peg$expect(expected) {
				var top = peg$expected[peg$expected.length - 1];

				if (peg$currPos < top.pos) { return; }

				if (peg$currPos > top.pos) {
					top.pos = peg$currPos;
					top.variants = [];
				}

				top.variants.push(expected);
			}

			function peg$end(invert) {
				var expected = peg$expected.pop();
				var top = peg$expected[peg$expected.length - 1];
				var variants = expected.variants;

				if (top.pos !== expected.pos) { return; }

				if (invert) {
					variants = variants.map(function(e) {
						return e.type === "not" ? e.expected : { type: "not", expected: e };
					});
				}

				Array.prototype.push.apply(top.variants, variants);
			}

			function peg$buildSimpleError(message, location) {
				return new peg$SyntaxError(message, null, null, location);
			}

			function peg$buildStructuredError(expected, found, location) {
				return new peg$SyntaxError(
					peg$SyntaxError.buildMessage(expected, found),
					expected,
					found,
					location
				);
			}

			function peg$buildError() {
				var expected = peg$expected[0];
				var failPos = expected.pos;

				return peg$buildStructuredError(
					expected.variants,
					failPos < input.length ? input.charAt(failPos) : null,
					failPos < input.length
						? peg$computeLocation(failPos, failPos + 1)
						: peg$computeLocation(failPos, failPos)
				);
			}

			function peg$parse구문() {
				var s0, s1, s2;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 0;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				s1 = [];
				s2 = peg$parse식();
				while (s2 !== peg$FAILED) {
					s1.push(s2);
					s2 = peg$parse식();
				}
				peg$savedPos = s0;
				s1 = peg$f0.call(options.context, s1);
				s0 = s1;

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse식() {
				var s0;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 1;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$parse표현식영역();
				if (s0 === peg$FAILED) {
					s0 = peg$parse고정문자열();
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse고정문자열() {
				var s0, s1, s2;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 2;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				s1 = [];
				rule$expects(peg$e0);
				if (peg$r0.test(input.charAt(peg$currPos))) {
					s2 = input.charAt(peg$currPos);
					peg$currPos++;
				} else {
					s2 = peg$FAILED;
				}
				if (s2 !== peg$FAILED) {
					while (s2 !== peg$FAILED) {
						s1.push(s2);
						rule$expects(peg$e0);
						if (peg$r0.test(input.charAt(peg$currPos))) {
							s2 = input.charAt(peg$currPos);
							peg$currPos++;
						} else {
							s2 = peg$FAILED;
						}
					}
				} else {
					s1 = peg$FAILED;
				}
				if (s1 !== peg$FAILED) {
					peg$savedPos = s0;
					s1 = peg$f1.call(options.context, s1);
				}
				s0 = s1;
				if (s0 === peg$FAILED) {
					s0 = peg$currPos;
					rule$expects(peg$e1);
					if (input.substr(peg$currPos, 2) === peg$c0) {
						s1 = peg$c0;
						peg$currPos += 2;
					} else {
						s1 = peg$FAILED;
					}
					if (s1 !== peg$FAILED) {
						peg$savedPos = s0;
						s1 = peg$f2.call(options.context, s1);
					}
					s0 = s1;
					if (s0 === peg$FAILED) {
						s0 = peg$currPos;
						rule$expects(peg$e2);
						if (input.substr(peg$currPos, 2) === peg$c1) {
							s1 = peg$c1;
							peg$currPos += 2;
						} else {
							s1 = peg$FAILED;
						}
						if (s1 !== peg$FAILED) {
							peg$savedPos = s0;
							s1 = peg$f2.call(options.context, s1);
						}
						s0 = s1;
					}
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse표현식영역() {
				var s0, s1, s2, s3, s4, s5;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 3;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				rule$expects(peg$e3);
				if (input.charCodeAt(peg$currPos) === 123) {
					s1 = peg$c2;
					peg$currPos++;
				} else {
					s1 = peg$FAILED;
				}
				if (s1 !== peg$FAILED) {
					s2 = peg$parse공백();
					s3 = peg$parse표현식();
					if (s3 !== peg$FAILED) {
						s4 = peg$parse공백();
						rule$expects(peg$e4);
						if (input.charCodeAt(peg$currPos) === 125) {
							s5 = peg$c3;
							peg$currPos++;
						} else {
							s5 = peg$FAILED;
						}
						if (s5 !== peg$FAILED) {
							peg$savedPos = s0;
							s0 = peg$f3.call(options.context, s3);
						} else {
							peg$currPos = s0;
							s0 = peg$FAILED;
						}
					} else {
						peg$currPos = s0;
						s0 = peg$FAILED;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$FAILED;
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse표현식() {
				var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 4;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				s1 = peg$parse표현식요소();
				if (s1 !== peg$FAILED) {
					s2 = [];
					s3 = peg$currPos;
					s4 = peg$parse공백();
					s5 = peg$parse연산자();
					if (s5 !== peg$FAILED) {
						s6 = peg$parse공백();
						s7 = peg$parse표현식요소();
						if (s7 !== peg$FAILED) {
							s8 = peg$parse공백();
							rule$expects(peg$e5);
							if (input.charCodeAt(peg$currPos) === 58) {
								s9 = peg$c4;
								peg$currPos++;
							} else {
								s9 = peg$FAILED;
							}
							if (s9 === peg$FAILED) {
								s9 = null;
							}
							s10 = peg$parse공백();
							s11 = peg$parse표현식요소();
							if (s11 === peg$FAILED) {
								s11 = null;
							}
							s4 = [s4, s5, s6, s7, s8, s9, s10, s11];
							s3 = s4;
						} else {
							peg$currPos = s3;
							s3 = peg$FAILED;
						}
					} else {
						peg$currPos = s3;
						s3 = peg$FAILED;
					}
					while (s3 !== peg$FAILED) {
						s2.push(s3);
						s3 = peg$currPos;
						s4 = peg$parse공백();
						s5 = peg$parse연산자();
						if (s5 !== peg$FAILED) {
							s6 = peg$parse공백();
							s7 = peg$parse표현식요소();
							if (s7 !== peg$FAILED) {
								s8 = peg$parse공백();
								rule$expects(peg$e5);
								if (input.charCodeAt(peg$currPos) === 58) {
									s9 = peg$c4;
									peg$currPos++;
								} else {
									s9 = peg$FAILED;
								}
								if (s9 === peg$FAILED) {
									s9 = null;
								}
								s10 = peg$parse공백();
								s11 = peg$parse표현식요소();
								if (s11 === peg$FAILED) {
									s11 = null;
								}
								s4 = [s4, s5, s6, s7, s8, s9, s10, s11];
								s3 = s4;
							} else {
								peg$currPos = s3;
								s3 = peg$FAILED;
							}
						} else {
							peg$currPos = s3;
							s3 = peg$FAILED;
						}
					}
					peg$savedPos = s0;
					s0 = peg$f4.call(options.context, s1, s2);
				} else {
					peg$currPos = s0;
					s0 = peg$FAILED;
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse표현식요소() {
				var s0, s1, s2, s3;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 5;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				s1 = peg$parse표현식요소값();
				if (s1 !== peg$FAILED) {
					s2 = [];
					s3 = peg$parse함수();
					if (s3 === peg$FAILED) {
						s3 = peg$parse속성();
					}
					while (s3 !== peg$FAILED) {
						s2.push(s3);
						s3 = peg$parse함수();
						if (s3 === peg$FAILED) {
							s3 = peg$parse속성();
						}
					}
					peg$savedPos = s0;
					s0 = peg$f5.call(options.context, s1, s2);
				} else {
					peg$currPos = s0;
					s0 = peg$FAILED;
				}
				if (s0 === peg$FAILED) {
					s0 = peg$parse표현식_서브();
					if (s0 === peg$FAILED) {
						s0 = peg$parse표현식_숫자();
					}
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse속성() {
				var s0, s1, s2, s3, s4, s5;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 6;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				rule$expects(peg$e6);
				if (input.charCodeAt(peg$currPos) === 46) {
					s1 = peg$c5;
					peg$currPos++;
				} else {
					s1 = peg$FAILED;
				}
				if (s1 !== peg$FAILED) {
					s2 = peg$parse식별자();
					if (s2 !== peg$FAILED) {
						peg$savedPos = s0;
						s0 = peg$f6.call(options.context, s2);
					} else {
						peg$currPos = s0;
						s0 = peg$FAILED;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$FAILED;
				}
				if (s0 === peg$FAILED) {
					s0 = peg$currPos;
					rule$expects(peg$e7);
					if (input.charCodeAt(peg$currPos) === 91) {
						s1 = peg$c6;
						peg$currPos++;
					} else {
						s1 = peg$FAILED;
					}
					if (s1 !== peg$FAILED) {
						s2 = peg$parse공백();
						s3 = peg$parse표현식();
						if (s3 !== peg$FAILED) {
							s4 = peg$parse공백();
							rule$expects(peg$e8);
							if (input.charCodeAt(peg$currPos) === 93) {
								s5 = peg$c7;
								peg$currPos++;
							} else {
								s5 = peg$FAILED;
							}
							if (s5 !== peg$FAILED) {
								peg$savedPos = s0;
								s0 = peg$f7.call(options.context, s3);
							} else {
								peg$currPos = s0;
								s0 = peg$FAILED;
							}
						} else {
							peg$currPos = s0;
							s0 = peg$FAILED;
						}
					} else {
						peg$currPos = s0;
						s0 = peg$FAILED;
					}
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse표현식_전역함수() {
				var s0, s1, s2, s3, s4, s5, s6, s7;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 7;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				s1 = peg$parse식별자();
				if (s1 !== peg$FAILED) {
					s2 = peg$parse공백();
					rule$expects(peg$e9);
					if (input.charCodeAt(peg$currPos) === 40) {
						s3 = peg$c8;
						peg$currPos++;
					} else {
						s3 = peg$FAILED;
					}
					if (s3 !== peg$FAILED) {
						s4 = peg$parse공백();
						s5 = [];
						s6 = peg$parse파라미터();
						while (s6 !== peg$FAILED) {
							s5.push(s6);
							s6 = peg$parse파라미터();
						}
						s6 = peg$parse공백();
						rule$expects(peg$e10);
						if (input.charCodeAt(peg$currPos) === 41) {
							s7 = peg$c9;
							peg$currPos++;
						} else {
							s7 = peg$FAILED;
						}
						if (s7 !== peg$FAILED) {
							peg$savedPos = s0;
							s0 = peg$f8.call(options.context, s1, s5);
						} else {
							peg$currPos = s0;
							s0 = peg$FAILED;
						}
					} else {
						peg$currPos = s0;
						s0 = peg$FAILED;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$FAILED;
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse함수() {
				var s0, s1, s2, s3, s4, s5, s6, s7;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 8;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				s1 = peg$parse속성();
				if (s1 !== peg$FAILED) {
					s2 = peg$parse공백();
					rule$expects(peg$e9);
					if (input.charCodeAt(peg$currPos) === 40) {
						s3 = peg$c8;
						peg$currPos++;
					} else {
						s3 = peg$FAILED;
					}
					if (s3 !== peg$FAILED) {
						s4 = peg$parse공백();
						s5 = [];
						s6 = peg$parse파라미터();
						while (s6 !== peg$FAILED) {
							s5.push(s6);
							s6 = peg$parse파라미터();
						}
						s6 = peg$parse공백();
						rule$expects(peg$e10);
						if (input.charCodeAt(peg$currPos) === 41) {
							s7 = peg$c9;
							peg$currPos++;
						} else {
							s7 = peg$FAILED;
						}
						if (s7 !== peg$FAILED) {
							peg$savedPos = s0;
							s0 = peg$f9.call(options.context, s1, s5);
						} else {
							peg$currPos = s0;
							s0 = peg$FAILED;
						}
					} else {
						peg$currPos = s0;
						s0 = peg$FAILED;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$FAILED;
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse표현식요소값() {
				var s0;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 9;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$parse표현식_문자열();
				if (s0 === peg$FAILED) {
					s0 = peg$parse표현식_전역함수();
					if (s0 === peg$FAILED) {
						s0 = peg$parse표현식_변수();
					}
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse파라미터() {
				var s0, s1, s2, s3, s4, s5, s6, s7;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 10;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				s1 = peg$parse표현식();
				if (s1 !== peg$FAILED) {
					s2 = [];
					s3 = peg$currPos;
					s4 = peg$parse공백();
					rule$expects(peg$e11);
					if (input.charCodeAt(peg$currPos) === 44) {
						s5 = peg$c10;
						peg$currPos++;
					} else {
						s5 = peg$FAILED;
					}
					if (s5 !== peg$FAILED) {
						s6 = peg$parse공백();
						s7 = peg$parse표현식();
						if (s7 !== peg$FAILED) {
							s4 = [s4, s5, s6, s7];
							s3 = s4;
						} else {
							peg$currPos = s3;
							s3 = peg$FAILED;
						}
					} else {
						peg$currPos = s3;
						s3 = peg$FAILED;
					}
					while (s3 !== peg$FAILED) {
						s2.push(s3);
						s3 = peg$currPos;
						s4 = peg$parse공백();
						rule$expects(peg$e11);
						if (input.charCodeAt(peg$currPos) === 44) {
							s5 = peg$c10;
							peg$currPos++;
						} else {
							s5 = peg$FAILED;
						}
						if (s5 !== peg$FAILED) {
							s6 = peg$parse공백();
							s7 = peg$parse표현식();
							if (s7 !== peg$FAILED) {
								s4 = [s4, s5, s6, s7];
								s3 = s4;
							} else {
								peg$currPos = s3;
								s3 = peg$FAILED;
							}
						} else {
							peg$currPos = s3;
							s3 = peg$FAILED;
						}
					}
					peg$savedPos = s0;
					s0 = peg$f10.call(options.context, s1, s2);
				} else {
					peg$currPos = s0;
					s0 = peg$FAILED;
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse표현식_서브() {
				var s0, s1, s2, s3, s4, s5;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 11;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				rule$expects(peg$e9);
				if (input.charCodeAt(peg$currPos) === 40) {
					s1 = peg$c8;
					peg$currPos++;
				} else {
					s1 = peg$FAILED;
				}
				if (s1 !== peg$FAILED) {
					s2 = peg$parse공백();
					s3 = peg$parse표현식();
					if (s3 !== peg$FAILED) {
						s4 = peg$parse공백();
						rule$expects(peg$e10);
						if (input.charCodeAt(peg$currPos) === 41) {
							s5 = peg$c9;
							peg$currPos++;
						} else {
							s5 = peg$FAILED;
						}
						if (s5 !== peg$FAILED) {
							peg$savedPos = s0;
							s0 = peg$f3.call(options.context, s3);
						} else {
							peg$currPos = s0;
							s0 = peg$FAILED;
						}
					} else {
						peg$currPos = s0;
						s0 = peg$FAILED;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$FAILED;
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse식별자() {
				var s0, s1, s2, s3;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 12;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				rule$expects(peg$e12);
				if (peg$r1.test(input.charAt(peg$currPos))) {
					s1 = input.charAt(peg$currPos);
					peg$currPos++;
				} else {
					s1 = peg$FAILED;
				}
				if (s1 !== peg$FAILED) {
					s2 = [];
					rule$expects(peg$e13);
					if (peg$r2.test(input.charAt(peg$currPos))) {
						s3 = input.charAt(peg$currPos);
						peg$currPos++;
					} else {
						s3 = peg$FAILED;
					}
					while (s3 !== peg$FAILED) {
						s2.push(s3);
						rule$expects(peg$e13);
						if (peg$r2.test(input.charAt(peg$currPos))) {
							s3 = input.charAt(peg$currPos);
							peg$currPos++;
						} else {
							s3 = peg$FAILED;
						}
					}
					peg$savedPos = s0;
					s0 = peg$f11.call(options.context, s1, s2);
				} else {
					peg$currPos = s0;
					s0 = peg$FAILED;
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse키워드() {
				var s0, s1;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 13;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				rule$expects(peg$e14);
				if (input.substr(peg$currPos, 4) === peg$c11) {
					s1 = peg$c11;
					peg$currPos += 4;
				} else {
					s1 = peg$FAILED;
				}
				if (s1 !== peg$FAILED) {
					peg$savedPos = s0;
					s1 = peg$f12.call(options.context);
				}
				s0 = s1;
				if (s0 === peg$FAILED) {
					s0 = peg$currPos;
					rule$expects(peg$e15);
					if (input.substr(peg$currPos, 5) === peg$c12) {
						s1 = peg$c12;
						peg$currPos += 5;
					} else {
						s1 = peg$FAILED;
					}
					if (s1 !== peg$FAILED) {
						peg$savedPos = s0;
						s1 = peg$f13.call(options.context);
					}
					s0 = s1;
					if (s0 === peg$FAILED) {
						s0 = peg$currPos;
						rule$expects(peg$e16);
						if (input.charCodeAt(peg$currPos) === 78) {
							s1 = peg$c13;
							peg$currPos++;
						} else {
							s1 = peg$FAILED;
						}
						if (s1 !== peg$FAILED) {
							peg$savedPos = s0;
							s1 = peg$f14.call(options.context);
						}
						s0 = s1;
						if (s0 === peg$FAILED) {
							s0 = peg$currPos;
							rule$expects(peg$e17);
							if (input.substr(peg$currPos, 4) === peg$c14) {
								s1 = peg$c14;
								peg$currPos += 4;
							} else {
								s1 = peg$FAILED;
							}
							if (s1 !== peg$FAILED) {
								peg$savedPos = s0;
								s1 = peg$f15.call(options.context);
							}
							s0 = s1;
						}
					}
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse공백() {
				var s0, s1;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 14;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = [];
				rule$expects(peg$e18);
				if (peg$r3.test(input.charAt(peg$currPos))) {
					s1 = input.charAt(peg$currPos);
					peg$currPos++;
				} else {
					s1 = peg$FAILED;
				}
				while (s1 !== peg$FAILED) {
					s0.push(s1);
					rule$expects(peg$e18);
					if (peg$r3.test(input.charAt(peg$currPos))) {
						s1 = input.charAt(peg$currPos);
						peg$currPos++;
					} else {
						s1 = peg$FAILED;
					}
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse연산자() {
				var s0;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 15;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				rule$expects(peg$e19);
				if (input.substr(peg$currPos, 3) === peg$c15) {
					s0 = peg$c15;
					peg$currPos += 3;
				} else {
					s0 = peg$FAILED;
				}
				if (s0 === peg$FAILED) {
					rule$expects(peg$e20);
					if (input.substr(peg$currPos, 3) === peg$c16) {
						s0 = peg$c16;
						peg$currPos += 3;
					} else {
						s0 = peg$FAILED;
					}
					if (s0 === peg$FAILED) {
						rule$expects(peg$e21);
						if (input.substr(peg$currPos, 2) === peg$c17) {
							s0 = peg$c17;
							peg$currPos += 2;
						} else {
							s0 = peg$FAILED;
						}
						if (s0 === peg$FAILED) {
							rule$expects(peg$e22);
							if (input.substr(peg$currPos, 2) === peg$c18) {
								s0 = peg$c18;
								peg$currPos += 2;
							} else {
								s0 = peg$FAILED;
							}
							if (s0 === peg$FAILED) {
								rule$expects(peg$e23);
								if (input.substr(peg$currPos, 2) === peg$c19) {
									s0 = peg$c19;
									peg$currPos += 2;
								} else {
									s0 = peg$FAILED;
								}
								if (s0 === peg$FAILED) {
									rule$expects(peg$e24);
									if (input.substr(peg$currPos, 2) === peg$c20) {
										s0 = peg$c20;
										peg$currPos += 2;
									} else {
										s0 = peg$FAILED;
									}
									if (s0 === peg$FAILED) {
										rule$expects(peg$e25);
										if (input.substr(peg$currPos, 2) === peg$c21) {
											s0 = peg$c21;
											peg$currPos += 2;
										} else {
											s0 = peg$FAILED;
										}
										if (s0 === peg$FAILED) {
											rule$expects(peg$e26);
											if (input.substr(peg$currPos, 2) === peg$c22) {
												s0 = peg$c22;
												peg$currPos += 2;
											} else {
												s0 = peg$FAILED;
											}
											if (s0 === peg$FAILED) {
												rule$expects(peg$e27);
												if (input.charCodeAt(peg$currPos) === 43) {
													s0 = peg$c23;
													peg$currPos++;
												} else {
													s0 = peg$FAILED;
												}
												if (s0 === peg$FAILED) {
													rule$expects(peg$e28);
													if (input.charCodeAt(peg$currPos) === 45) {
														s0 = peg$c24;
														peg$currPos++;
													} else {
														s0 = peg$FAILED;
													}
													if (s0 === peg$FAILED) {
														rule$expects(peg$e29);
														if (input.charCodeAt(peg$currPos) === 42) {
															s0 = peg$c25;
															peg$currPos++;
														} else {
															s0 = peg$FAILED;
														}
														if (s0 === peg$FAILED) {
															rule$expects(peg$e30);
															if (input.charCodeAt(peg$currPos) === 47) {
																s0 = peg$c26;
																peg$currPos++;
															} else {
																s0 = peg$FAILED;
															}
															if (s0 === peg$FAILED) {
																rule$expects(peg$e31);
																if (input.charCodeAt(peg$currPos) === 60) {
																	s0 = peg$c27;
																	peg$currPos++;
																} else {
																	s0 = peg$FAILED;
																}
																if (s0 === peg$FAILED) {
																	rule$expects(peg$e32);
																	if (input.charCodeAt(peg$currPos) === 62) {
																		s0 = peg$c28;
																		peg$currPos++;
																	} else {
																		s0 = peg$FAILED;
																	}
																	if (s0 === peg$FAILED) {
																		rule$expects(peg$e33);
																		if (input.charCodeAt(peg$currPos) === 63) {
																			s0 = peg$c29;
																			peg$currPos++;
																		} else {
																			s0 = peg$FAILED;
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse표현식_숫자() {
				var s0, s1, s2, s3, s4;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 16;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				s1 = [];
				rule$expects(peg$e34);
				if (peg$r4.test(input.charAt(peg$currPos))) {
					s2 = input.charAt(peg$currPos);
					peg$currPos++;
				} else {
					s2 = peg$FAILED;
				}
				if (s2 !== peg$FAILED) {
					while (s2 !== peg$FAILED) {
						s1.push(s2);
						rule$expects(peg$e34);
						if (peg$r4.test(input.charAt(peg$currPos))) {
							s2 = input.charAt(peg$currPos);
							peg$currPos++;
						} else {
							s2 = peg$FAILED;
						}
					}
				} else {
					s1 = peg$FAILED;
				}
				if (s1 !== peg$FAILED) {
					rule$expects(peg$e6);
					if (input.charCodeAt(peg$currPos) === 46) {
						s2 = peg$c5;
						peg$currPos++;
					} else {
						s2 = peg$FAILED;
					}
					if (s2 === peg$FAILED) {
						s2 = null;
					}
					s3 = [];
					rule$expects(peg$e34);
					if (peg$r4.test(input.charAt(peg$currPos))) {
						s4 = input.charAt(peg$currPos);
						peg$currPos++;
					} else {
						s4 = peg$FAILED;
					}
					while (s4 !== peg$FAILED) {
						s3.push(s4);
						rule$expects(peg$e34);
						if (peg$r4.test(input.charAt(peg$currPos))) {
							s4 = input.charAt(peg$currPos);
							peg$currPos++;
						} else {
							s4 = peg$FAILED;
						}
					}
					peg$savedPos = s0;
					s0 = peg$f16.call(options.context, s1, s2, s3);
				} else {
					peg$currPos = s0;
					s0 = peg$FAILED;
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse표현식_문자열() {
				var s0, s1, s2, s3;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 17;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$currPos;
				rule$expects(peg$e35);
				if (input.charCodeAt(peg$currPos) === 34) {
					s1 = peg$c30;
					peg$currPos++;
				} else {
					s1 = peg$FAILED;
				}
				if (s1 !== peg$FAILED) {
					s2 = [];
					rule$expects(peg$e36);
					if (peg$r5.test(input.charAt(peg$currPos))) {
						s3 = input.charAt(peg$currPos);
						peg$currPos++;
					} else {
						s3 = peg$FAILED;
					}
					while (s3 !== peg$FAILED) {
						s2.push(s3);
						rule$expects(peg$e36);
						if (peg$r5.test(input.charAt(peg$currPos))) {
							s3 = input.charAt(peg$currPos);
							peg$currPos++;
						} else {
							s3 = peg$FAILED;
						}
					}
					rule$expects(peg$e35);
					if (input.charCodeAt(peg$currPos) === 34) {
						s3 = peg$c30;
						peg$currPos++;
					} else {
						s3 = peg$FAILED;
					}
					if (s3 !== peg$FAILED) {
						peg$savedPos = s0;
						s0 = peg$f17.call(options.context, s2);
					} else {
						peg$currPos = s0;
						s0 = peg$FAILED;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$FAILED;
				}
				if (s0 === peg$FAILED) {
					s0 = peg$currPos;
					rule$expects(peg$e37);
					if (input.charCodeAt(peg$currPos) === 39) {
						s1 = peg$c31;
						peg$currPos++;
					} else {
						s1 = peg$FAILED;
					}
					if (s1 !== peg$FAILED) {
						s2 = [];
						rule$expects(peg$e38);
						if (peg$r6.test(input.charAt(peg$currPos))) {
							s3 = input.charAt(peg$currPos);
							peg$currPos++;
						} else {
							s3 = peg$FAILED;
						}
						while (s3 !== peg$FAILED) {
							s2.push(s3);
							rule$expects(peg$e38);
							if (peg$r6.test(input.charAt(peg$currPos))) {
								s3 = input.charAt(peg$currPos);
								peg$currPos++;
							} else {
								s3 = peg$FAILED;
							}
						}
						rule$expects(peg$e37);
						if (input.charCodeAt(peg$currPos) === 39) {
							s3 = peg$c31;
							peg$currPos++;
						} else {
							s3 = peg$FAILED;
						}
						if (s3 !== peg$FAILED) {
							peg$savedPos = s0;
							s0 = peg$f17.call(options.context, s2);
						} else {
							peg$currPos = s0;
							s0 = peg$FAILED;
						}
					} else {
						peg$currPos = s0;
						s0 = peg$FAILED;
					}
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			function peg$parse표현식_변수() {
				var s0, s1;

				var rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
				}

				var key = peg$currPos * 19 + 18;
				var cached = peg$resultsCache[key];
				var rule$expectations = [];

				rule$expects = function (expected) {
					if (peg$silentFails === 0) peg$expect(expected);
					rule$expectations.push(expected);
				}

				if (cached) {
					peg$currPos = cached.nextPos;

					rule$expectations = cached.expectations;
					if (peg$silentFails === 0) {
						rule$expectations.forEach(peg$expect);
					}

					return cached.result;
				}

				s0 = peg$parse키워드();
				if (s0 === peg$FAILED) {
					s0 = peg$currPos;
					s1 = peg$parse식별자();
					if (s1 !== peg$FAILED) {
						peg$savedPos = s0;
						s1 = peg$f18.call(options.context, s1);
					}
					s0 = s1;
				}

				peg$resultsCache[key] = {
					nextPos: peg$currPos,
					result: s0,
					expectations: rule$expectations
				};

				return s0;
			}

			peg$begin();
			peg$result = peg$startRuleFunction();

			if (peg$result !== peg$FAILED && peg$currPos === input.length) {
				return peg$result;
			} else {
				if (peg$result !== peg$FAILED && peg$currPos < input.length) {
					peg$expect(peg$endExpectation());
				}

				throw peg$buildError();
			}
		}

		/**
		 * 바인딩 메타 맵에 메타를 추가한다.
		 *
		 * @param {Object.<string, object>} bm 바인딩 메타데이터 맵
		 * @param {Object} bmo 바인딩 메타데이터 객체
		 */
		function addBm(bm, bmo){
			if(!bm[bmo.key]){
				bm[bmo.key] = [];
			}
			bm[bmo.key].push(bmo);
		}

		/**
		 * 유일한 셀렉터 문자열을 반환한다.
		 *
		 * @param {HTMLElement|jQuery} ele - 셀렉터 생성 대상 요소
		 * @param {HTMLElement|jQuery|string} [elContext] - 생략할 경우 최상위 노드까지 탐색하여 셀렉터를 생성한다.
		 * @returns {string} - $elContext 내에서 ele를 식별하기 위한 유일한 셀렉터
		 */
		function uniqueSelector(ele, elContext){
			var selector, $ele = $(ele), $elContext = elContext ? $(elContext) : null;
			while($ele.length){
				var rawEle = $ele[0];
				var tag = rawEle.localName;
				if(!tag) break;
				tag = tag.toLowerCase();
				var parent = $ele.parent();
				var tagDup = parent.children(tag);
				if(tagDup.length > 1){
					var index = parent.children().index(rawEle) + 1;
					tag += ':nth-child(' + index + ')';
				}
				selector = tag + (selector ? '>' + selector : '');
				$ele = parent;
				if($elContext && $ele[0] === $elContext[0]){
					break;
				}
			}
			return selector;
		}

		/* 상수 숫자/문자열 제거용 정규 표현식 */
		var regexpClear = /\s*[0-9]+\s*|'[^']*'|"[^"]*|[\)\(]/g;
		/* 바인딩 변수 추출 용 정규 표현식 */
		var regexpKeys = /(^[a-zA-Zㄱ-힣_][a-zA-Z0-9ㄱ-힣_]*|\s+[a-zA-Zㄱ-힣_][a-zA-Z0-9ㄱ-힣_]*)/g;
		/* 표현식 포함 여부 테스트용 정규 표현식 */
		var regexpExpr = /\{\s*([^\}]+)\s*\}/g;

		/**
		 * 표현식에 사용된 바인딩 변수를 추출 한다. 변수를 포함하는 표현식의 경우에만 데이터 변경 시 재 평가가 필요하다.
		 *
		 * @param {string} s - 표현식 문자열
		 * @returns {Object.<string,number>} - 표현식에 포함된 바인딩 변수명을 키로 사용 횟수를 값으로 한 맵을 반환.
		 *
		 **/
		function extractKeymap(s){
			var expr, key, km;
			/* 표현식을 포함하는가? */
			if(!regexpExpr.test(s)){
				return {};
			}

			regexpExpr.lastIndex = 0;
			/* 표현식을 추출 */
			while(expr = regexpExpr.exec(s)){
				/* 변수 추출을 위해 상수 제거 */
				expr = expr[1].replace(regexpClear, ' ').trim();
				km = {};
				/* 변수 추출 및 중복 제거 */
				while(key = regexpKeys.exec(expr)){
					key = key[1].trim();
					km[key] = km[key] ? km[key] + 1 : 1;
				}
			}
			return km;
		}

		N.expr = {
			SyntaxError: peg$SyntaxError,
			parse: peg$parse,
			/**
			 *
			 * 지정 요소에 바인딩을 수행한다.
			 *
			 * @param {jQuery|HTMLElement|string} elContext - 데이터가 바인딩될 HTML 요소 혹은 jQuery 객체 (각각의 바인딩 요소가 아닌 복수의 바인딩 대상 요소를 포함하는 부모 요소)
			 * @param {Object} meta - 바인딩 메타 정보
			 * @param {Object} data - 바인딩 데이터
			 * @param {Object} [exprContext] - 미리 준비된 표현식 컨텍스트 객체
			 *
			 * @returns {jQuery} 바인딩된 대상 요소 jQuery 객체
			 */
			execute: function(elContext, meta, data, exprContext){

				var $elContext = $(elContext);

				if(arguments.length == 3){
					exprContext = { context: data };
				}

				var $ele =  $elContext.find(meta.selector);

				switch(meta.type){
					case "id":
						switch(meta.tag){
							case 'input':
								switch(meta.tagType){
									case 'radio':
									case 'checkbox':
										if($ele.hasClass('select_template')){

										}else{

										}
										break;
									default:
										$ele.val(data[meta.key] == null ? "" : String(data[meta.key]));
										break;
								}
								break;
							case 'textarea':
							case 'select':
								$ele.val(data[meta.key] == null ? "" : String(data[meta.key]));
								break;
							case 'img':
								$ele.attr('src', data[meta.key] == null ? "" : String(data[meta.key]));
								break;
							default:
								// noop
								break;
						}
						break;
					case "attr":
						switch(meta.name){
							case 'data-value':
								if($ele.is("[data-html]")){
									$ele.html(N.expr.parse(meta.expr, exprContext));
								}else{
									$ele.text(N.expr.parse(meta.expr, exprContext));
								}
								break;
							case 'value':
								$ele.val(N.expr.parse(meta.expr, exprContext));
								break;
							default:
								$ele.attr(meta.name, N.expr.parse(meta.expr, exprContext));
								break;
						}
						break;
					case "text":
						/* NOTE 텍스트 노드 바인딩은 HTML을 지원하지 않는다. */
						$ele[0].childNodes[meta.index].nodeValue = N.expr.parse(meta.expr, exprContext);
						break;
					default:
						// noop
						break;
				}
				return $ele;
			},

			/**
			 *
			 * HTML 요소로 부터 바인딩을 위한 메타 정보를 분석한다.
			 *
			 * @param {HTMLElement|jQuery|string} elContext - 데이터가 바인딩될 HTML 요소 혹은 jQuery 객체 (각각의 바인딩 요소가 아닌 복수의 바인딩 대상 요소를 포함하는 부모 요소)
			 */
			analyze: function(elContext){

				var $elContext = $(elContext);

				/** @type {jQuery} */
				var $targets = $elContext.find(':not(.view_context__, option)').not('select_input__:not(.select_template)');

				var bm = {};

				var a, n, v, attrs, tagName, selector, hasValueBinding;

				$targets.each(function(i, /** @type {HTMLElement} */ele){

					/* 1. 표현식이 사용된 속성 처리 */
					selector = uniqueSelector(ele, $elContext);
					tagName = ele.tagName.toLowerCase();
					attrs = ele.attributes;

					/* data-value, value 속성은 id 바인딩을 쓸 수 없는 경우에 사용 */
					hasValueBinding = ele.hasAttribute('data-value') || ele.hasAttribute('value');

					for(var i = 0; i < attrs.length; i++){
						a = attrs[i];
						n = a.name;
						v = a.value;

						if(n == 'id'){
							/* 값 바인딩 속성이 존재하는 경우 id 바인딩은 생략한다 */
							if(hasValueBinding){
								continue;
							}
							addBm(bm, {
								  type: 'id'
								, selector: selector
								, tag: tagName
								, tagType: ele.type
								, key: v
							});
						}else if("pattern,".indexOf(n) > -1){
							/* 표현식 처리 대상이 아닌 속성 */
							continue;
						}else {
							for(var k in extractKeymap(v)){
								addBm(bm, {
									  type: 'attr'
									, name: n
									, expr: v
									, selector: selector
									, tag: tagName
									, tagType: ele.type
									, key: k
								});

								if(n == "data-value"){
									ele.removeAttribute("data-value");
								}
							}
						}
					}

					/* 표현식이 사용된 텍스트 노드 처리 */
					$.each(ele.childNodes, function(i, node){
						if(node.nodeType != 3){
							return;
						}

						var text = node.nodeValue;
						for(var k in extractKeymap(text)){
							addBm(bm, {
								  type: 'text'
								, index: i
								, expr: text
								, selector: selector
								, tag: tagName
								, tagType: ele.type
								, key: k
							});
						}
					});
				});
				return bm;
			}
		};
	})(N);
})(window, jQuery);