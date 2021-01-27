import type { ModuleState, DeepReadonlyModuleState } from './types';
import { check, checks } from './test-utils';


{
  const store = {
    state: {
      domain: 'ondricka.net',
      user: {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        age: 45,
        someBool: true,
        name: {
          first: 'Darius',
          last: 'Hilpert',
        },
        address: {
          street: 'Meda Cove Suite',
          country: 'USA',
        },
      },
    },
  };

  interface Expected {
    state: {
      domain: string;
      user: {
        name: {
          first: string;
          last: string;
        };
        age: number;
        someBool: boolean;
        address: {
          street: string;
          country: string;
        };
      };
    };
  }

  checks([
    check<ModuleState<typeof store>, Expected, true>(),
  ]);
}

{
  const store = {
    state: {
      x: 'Heteronym',
      a1: 'Inception',
      a2: {
        y: 'Nebula',
      },
    },
    modules: {
      a1: {},
      a2: {
        modules: {
          b: {
            modules: {
              c: {
                state: {},
                modules: {
                  d: {
                    state: {
                      color: 'Red',
                    },
                    modules: {
                      e: {
                        modules: {
                          f: {
                            state: {
                              car: {
                                name: 'Olympian',
                                manufacturer: 'Contemporary',
                              },
                            },
                            modules: {
                              g: {
                                modules: {
                                  h: {},
                                },
                              },
                            },
                          },
                        },
                      },
                      i: {
                        state: {
                          domain: 'ondricka.net',
                          user: {
                            name: {
                              first: 'Darius',
                              last: 'Hilpert',
                            },
                            address: {
                              street: 'Meda Cove Suite',
                              country: 'USA',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              m: {
                state: {
                  q: true,
                  w: false,
                },
                modules: {
                  q: {
                    state: {
                      o: {
                        p: 'Sanctuary',
                      },
                    },
                    modules: {
                      n: {
                        modules: {},
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  interface Expected {
    state: {
      x: string;
      a2: {
        b: {
          c: {
            d: {
              color: string;
              e: {
                f: {
                  car: {
                    name: string;
                    manufacturer: string;
                  };
                };
              };
              i: {
                domain: string;
                user: {
                  name: {
                    first: string;
                    last: string;
                  };
                  address: {
                    street: string;
                    country: string;
                  };
                };
              };
            };
          };
          m: {
            w: boolean;
            q: {
              o: {
                p: string;
              };
            };
          };
        };
      };
    };
  }

  checks([
    check<ModuleState<typeof store>, Expected, true>(),
  ]);

}

{
  const store = {
    state: {
      domain: 'ondricka.net',
      user: {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        age: 45,
        someBool: true,
        name: {
          first: 'Darius',
          last: 'Hilpert',
        },
        address: {
          street: 'Meda Cove Suite',
          country: 'USA',
        },
      },
    },
  };

  interface Expected {
    readonly state: {
      readonly domain: string;
      readonly user: {
        readonly name: {
          readonly first: string;
          readonly last: string;
        };
        readonly age: number;
        readonly someBool: boolean;
        readonly address: {
          readonly street: string;
          readonly country: string;
        };
      };
    };
  }

  checks([
    check<DeepReadonlyModuleState<typeof store>, Expected, true>(),
  ]);
}

{
  const store = {
    state: {
      x: 'Heteronym',
      a1: 'Inception',
      a2: {
        y: 'Nebula',
      },
    },
    modules: {
      a1: {},
      a2: {
        modules: {
          b: {
            modules: {
              c: {
                state: {},
                modules: {
                  d: {
                    state: {
                      color: 'Red',
                    },
                    modules: {
                      e: {
                        modules: {
                          f: {
                            state: {
                              car: {
                                name: 'Olympian',
                                manufacturer: 'Contemporary',
                              },
                            },
                            modules: {
                              g: {
                                modules: {
                                  h: {},
                                },
                              },
                            },
                          },
                        },
                      },
                      i: {
                        state: {
                          domain: 'ondricka.net',
                          user: {
                            name: {
                              first: 'Darius',
                              last: 'Hilpert',
                            },
                            address: {
                              street: 'Meda Cove Suite',
                              country: 'USA',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              m: {
                state: {
                  q: true,
                  w: false,
                },
                modules: {
                  q: {
                    state: {
                      o: {
                        p: 'Sanctuary',
                      },
                    },
                    modules: {
                      n: {
                        modules: {},
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  interface Expected {
    readonly state: {
      readonly x: string;
      readonly a2: {
        readonly b: {
          readonly c: {
            readonly d: {
              readonly color: string;
              readonly e: {
                readonly f: {
                  readonly car: {
                    readonly name: string;
                    readonly manufacturer: string;
                  };
                };
              };
              readonly i: {
                readonly domain: string;
                readonly user: {
                  readonly name: {
                    readonly first: string;
                    readonly last: string;
                  };
                  readonly address: {
                    readonly street: string;
                    readonly country: string;
                  };
                };
              };
            };
          };
          readonly m: {
            readonly w: boolean;
            readonly q: {
              readonly o: {
                readonly p: string;
              };
            };
          };
        };
      };
    };
  }

  checks([
    check<DeepReadonlyModuleState<typeof store>, Expected, true>(),
  ]);
}
